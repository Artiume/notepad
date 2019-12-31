import React from "react"
import styled from "styled-components"
import { ago } from "time-ago"

const TimeAgoWrapper = styled.span<{ long: boolean }>(({ long = false }) => ({
  display: long ? "unset" : "none",
  "@media (max-width: 800px)": {
    display: long ? "none" : "unset",
  },
}))

export const TimeAgo: React.FC<{ date: string; long?: boolean }> = ({ date, long = false }) => {
  return !long ? (
    <TimeAgoWrapper long={long}>{ago(date, true)} ago</TimeAgoWrapper>
  ) : (
    <TimeAgoWrapper long={long}>
      {date} ({ago(date, true)} ago)
    </TimeAgoWrapper>
  )
}
