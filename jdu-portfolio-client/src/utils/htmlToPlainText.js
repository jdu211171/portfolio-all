export function _convertHtmlToPlainText(clipboardHtml) {
    return '<p>' + clipboardHtml.replace(/<\/?[^>]+>/gi, '') + '</p>';
}