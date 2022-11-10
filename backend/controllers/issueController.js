import asyncHandler from "express-async-handler";
import Issue from "../models/issueModel.js";
import dotenv from "dotenv";
/**
 * @route GET /api/issues
 * @desc Get all issues
 * @access Public
 */
export const getIssues = asyncHandler(async (req, res) => {
  //Mongodb Search
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  //pagination
  const perPage = process.env.PER_PAGE;
  const pageNum = Number(req.query.page) || 1;
  const count = await Issue.countDocuments({ ...keyword });

  // const issues = await Issue.find({...keyword}, {_id:1, name:1})
  const issues = await Issue.find({ ...keyword })
    .limit(perPage)
    .skip(perPage * (pageNum - 1));
  return res.json({
    issues,
    perPage,
    page: pageNum,
    pages: Math.ceil(count / perPage),
  });
});
/**
 * @route GET /api/issues/:id
 * @desc Get issue by id
 * @access Public
 */

export const getIssueById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const issue = await Issue.findById(id);
  // console.log(`issue: ${issue}`.green)
  if (!issue) {
    return res.status(404).json({ msg: "Issue not found" });
  } else {
    return res.json(issue);
  }
});

/**
 * @route POST /api/issues
 * @desc Create new issue
 * @access Public
 */
export const createIssue = asyncHandler(async (req, res) => {
  // const { name } = req.body;
  // const issueExist = await Issue.findOne({ name });
  // if (issueExist) {
  //   res.status(400);
  //   throw new Error("Issue already exists");
  // } else {
    const issue = await Issue.create({ ...req.body, user: req.user.id });
    res.status(201).json({
      ...issue,
    });
  //}
});

export const initIssue = asyncHandler(async (req, res) => {
  const data = {
    name: "Temp name",
    price: 0.0,
    description: "...",
    category: "...",
    brand: "...",
    image: "images/sample.jpg",
  };

  const issue = await Issue.create({ ...data, user: req.user.id });
  res.status(201).json({
    ...issue._doc,
  });
});

/**
 * @route DELETE /api/issues/:id
 * @desc delete issue by id
 * @access Private/admin
 */
export const deleteIssueById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const issue = await Issue.findById(id);
  // console.log(`issue: ${issue}`.green)
  if (!issue) {
    return res.status(404).json({ msg: "Issue not found" });
  } else {
    // console.log(issue.user);
    // console.log(issue.user.id);
    issue.remove();
    return res.json(issue);
  }
});
/**
 * @route PUT /api/issues/:id
 * @desc update issue by id
 * @access Private/admin
 */
export const updateIssueById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, countInStock, category, brand } = req.body;
  const issue = await Issue.findById(id);
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  } else {
    Object.assign(issue, req.body);
    issue.save();
    return res.json(issue);
  }
});

/**
 * @route POST /api/issues/:id/reviews
 * @desc Add review for a issue
 * @access Private/user
 */
export const addIssueReview = asyncHandler(async (req, res) => {
  console.log("addIssueReview");
  const { id: pid } = req.params;
  const { title, content, rating } = req.body;
  const issue = await Issue.findById(pid);
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  } else {
    if (
      issue.reviews.find((r) => r.user.toString() == req.user.id.toString())
    ) {
      res.status(400).json({
        message: "you reviewed this issue!!",
      });
    } else {
      const rev = { title, content, rating, user: req.user.id };
      issue.reviews.push(rev);
      issue.save();
      return res.json(issue);
    }
  }
});

/**
 * @route GET /api/issues/top
 * @desc Get top issues
 * @access Public
 */
export const getTopIssues = asyncHandler(async (req, res) => {
  const limit = req.params.limit || 3
  const issues = await Issue.find({}, {_id:1, name:1, image:1, rating:1})
      .sort({ rating: -1 })
      .limit(limit);
  return res.json(issues);
});
