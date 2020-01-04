import styled from "styled-components"

export const InlineCode = styled.code(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: "90%",
  fontFamily: "Menlo,'Courier New',Courier,monospace",
  ":before,:after": {
    content: `"\\0060"`,
    color: theme.colors.primary,
  },
}))
