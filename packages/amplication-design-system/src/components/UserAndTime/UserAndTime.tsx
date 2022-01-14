import React, { useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "../Tooltip/Tooltip";
import "./UserAndTime.scss";
import "skeleton-screen-css";
import classNames from "classnames";

export type Props = {
  account?: { firstName?: string; lastName?: string };
  time: Date;
  loading?: boolean;
};

const CLASS_NAME = "user-and-time";
const LOADING_ANIMATION_CLASS_NAME = "ssc-head-line";
const DIRECTION = "n";

export function UserAndTime({ loading, account, time }: Props) {
  const [tooltipDirection, setTooltipDirection] = useState("s");

  const { firstName, lastName } = account || {};
  const formattedTime = useMemo(() => {
    return formatTimeToNow(time);
  }, [time]);
  const changeTooltipDirection = (pageY: number) => setTooltipDirection(pageY < 100 ? "s" : "n");

  return (
    <span
      className={classNames(CLASS_NAME, {
        [`${CLASS_NAME}--loading`]: loading,
        [LOADING_ANIMATION_CLASS_NAME]: loading,
      })}
    >
      <Tooltip
        aria-label={`${firstName} ${lastName}`}
        direction={tooltipDirection}
        noDelay
      >
        <span className={classNames(`${CLASS_NAME}__initials`)} onMouseOver={(e) => changeTooltipDirection(e.pageY)}>
          {!loading && firstName && firstName.substr(0, 1).toUpperCase()}
          {!loading && lastName && lastName.substr(0, 1).toUpperCase()}
        </span>
      </Tooltip>
      {!loading && formattedTime}
    </span>
  );
}

function formatTimeToNow(time: Date | null): string | null {
  return (
    time &&
    formatDistanceToNow(new Date(time), {
      addSuffix: true,
    })
  );
}
