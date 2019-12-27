import hljs from "highlight.js"

export default function(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (err) {
      console.log("Could not highlight.")
    }
  }

  try {
    return hljs.highlightAuto(str).value
  } catch (err) {
    console.log("Could not auto highlight.")
  }

  return "" // use external default escaping
}
