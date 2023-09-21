function getIndentLevelFromClassName(el: HTMLElement) {
    const matchResult = el.className.match(/(?<=ql-indent-)\d/);
    if (matchResult === null) return 0;
    return parseInt(matchResult[0], 10) ?? 0;
}

function compareTagName(el: HTMLElement | null, tagName: string) {
    return el?.tagName.toLowerCase() === tagName ?? false;
}

function isNotMediaTag(el: HTMLElement) {
    return !el.classList.contains("image-blot") && !el.classList.contains("ql-video-wrapper");
}

function isNotEmptyOrNewLineTag(el: HTMLElement) {
    const isNewLine = compareTagName(el.children.item(0) as HTMLElement, 'br')
    const isEmpty = el.children.length === 0 && el.innerText === ''
    return !isNewLine && !isEmpty
}

function addParagraphIndent(el: HTMLElement) {
    const indentLevel = getIndentLevelFromClassName(el);
    return " ".repeat(indentLevel * 2) + el.innerText;
  }

  function addListIndent(el: HTMLElement) {
    const listIndentLevel = getIndentLevelFromClassName(el);
    if (compareTagName(el, 'ul')) {
      return (<HTMLElement[]>Array.from(el.children)).map(c => {
        const indentLevel = getIndentLevelFromClassName(c) + listIndentLevel;
        return " ".repeat(indentLevel * 2) + "- " + c.innerText;
      });
    }
    if (compareTagName(el, 'ol')) {
      return (<HTMLElement[]>Array.from(el.children)).map((c, i) => {
        const indentLevel = getIndentLevelFromClassName(c) + listIndentLevel;
        return " ".repeat(indentLevel * 2) + `${i+1}. ` + c.innerText;
      });
    }
    return [];
  }

function convertDOMToString(htmlString: string) {
    const domParser = new DOMParser();

    const dom = domParser.parseFromString(htmlString, "text/html");

    const domArray = Array.from(dom.body.children) as HTMLElement[];

    const result = domArray.filter(d => isNotEmptyOrNewLineTag(d) && isNotMediaTag(d)).map(el => {
        if (compareTagName(el, 'ol') || compareTagName(el, 'ul')) {
          return addListIndent(el);
        }
        return addParagraphIndent(el);
      }).flat().join("\n");

    return result;
}

export default convertDOMToString;