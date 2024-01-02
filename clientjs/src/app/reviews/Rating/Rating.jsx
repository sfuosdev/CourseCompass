import React, { useState } from "react";
import { string, number, func, bool } from "prop-types";
import defaultClasses from "./rating.module.css";

const IconComponent = ({ type, width, height }) => {
  const imageDataSource = {
    ratingHighlighted: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.5L14.3175 9.195L19.5 9.9525L15.75 13.605L16.635 18.765L12 16.3275L7.365 18.765L8.25 13.605L4.5 9.9525L9.6825 9.195L12 4.5Z"
          fill="#6C90F5"
          stroke="#6C90F5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    ratingDefault: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1053 3.68421L14.7074 8.95579L20.5263 9.80632L16.3158 13.9074L17.3095 19.7011L12.1053 16.9642L6.90105 19.7011L7.89473 13.9074L3.6842 9.80632L9.50315 8.95579L12.1053 3.68421Z"
          fill="#FCFBF8"
          stroke="#E2E0DA"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  };

  return imageDataSource[type];
};

const SIZES = {
  SMALL: {
    key: "s",
    size: 10
  },
  MEDIUM: {
    key: "m",
    size: 18
  },
  LARGE: {
    key: "l",
    size: 28
  }
};

const OUT_OF_VALUE = 5;

const Rating = (props) => {
  const {
    iconSize,
    ratingInPercent,
    showOutOf,
    enableUserInteraction,
    onClick
  } = props;

  const [activeStar, setActiveStar] = useState(-1);
  const decimal = ratingInPercent / 20;
  const nonFraction = Math.trunc(decimal);
  const fraction = Number((decimal - nonFraction).toFixed(2));
  const fractionPercent = fraction * 100;

  const classes = defaultClasses;

  const numberOfStar = OUT_OF_VALUE;
  const size =
    iconSize === SIZES.SMALL.key
      ? SIZES.SMALL.size
      : iconSize === SIZES.MEDIUM.key
      ? SIZES.MEDIUM.size
      : SIZES.LARGE.size;

  const RatingHighlighted = (
    <IconComponent type={"ratingHighlighted"} width={size} height={size} />
  );
  const RatingDefault = (
    <IconComponent type={"ratingDefault"} width={size} height={size} />
  );

  const handleClick = (index) => {
    onClick(index + 1);
    setActiveStar(index);
  };

  const showDefaultStar = (index) => {
    return RatingDefault;
  };

  let isShow = true;
  const getStar = (index) => {
    if (index <= nonFraction - 1) {
      isShow = true;
      return "100%";
    } else if (fractionPercent > 0 && isShow) {
      isShow = false;
      return `${fractionPercent}%`;
    } else {
      return "0%";
    }
  };

  const isShowOutOfStar = (index) => {
    if (showOutOf) {
      return showOutOf;
    }

    const isLoopThrough = (fraction === 0 ? nonFraction : nonFraction + 1) - 1;
    return index <= isLoopThrough;
  };

  const withoutUserInteraction = (index) => {
    return isShowOutOfStar(index) ? (
      <div style={{ position: "relative" }} key={index}>
        <div
          style={{
            width: getStar(index),
            overflow: "hidden",
            position: "absolute"
          }}
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar(
          showOutOf
            ? nonFraction === 0
              ? index < nonFraction
              : index <= nonFraction
            : index <= numberOfStar
        )}
      </div>
    ) : null;
  };

  const withUserInteraction = (index) => {
    return (
      <div
        style={{ position: "relative" }}
        onClick={() => handleClick(index)}
        key={index}
      >
        <div
          style={{
            width: index <= activeStar ? "100%" : "0%",
            overflow: "hidden",
            position: "absolute"
          }}
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar()}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {[...new Array(numberOfStar)].map((arr, index) =>
        enableUserInteraction
          ? withUserInteraction(index)
          : withoutUserInteraction(index)
      )}
    </div>
  );
};

Rating.propTypes = {
  ratingInPercent: number.isRequired,
  iconSize: string,
  showOutOf: bool.isRequired,
  enableUserInteraction: bool.isRequired,
  onClick: func
};

Rating.defaultProps = {
  ratingInPercent: 50,
  iconSize: SIZES.LARGE.key,
  onClick: () => null,
  showOutOf: false,
  enableUserInteraction: false
};

export default Rating;
