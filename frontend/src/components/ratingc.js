import React from "react";
const Ratingc = (props) => {
  const { rvalue, color } = props;
  console.log(rvalue);
  return (
    <>
      <div className="rating">
          {[...Array(5)].map((i) => {
console.log(rvalue, i);
i++

                return (
                <span><i
                    style={{ color }}
                    className={
                        rvalue >= i
                        ? 'fas fa-star'
                        : rvalue >= i-0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                    ></i>
                </span>
                )

            }
            )}
     
      </div>
    </>
  );
};
Ratingc.defaultProps = {
  color: "#ffc107",
};

export default Ratingc;
