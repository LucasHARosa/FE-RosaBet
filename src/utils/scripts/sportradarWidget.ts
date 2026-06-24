export function loadSportradarWidget() {
  return `(function (a, b, c, d, e, f, g, h, i) {
    a[e] ||
      ((i = a[e] = function () {
        (a[e].q = a[e].q || []).push(arguments);
      }),
      (i.l = 1 * new Date()),
      (i.o = f),
      (g = b.createElement(c)),
      (h = b.getElementsByTagName(c)[0]),
      (g.async = 1),
      (g.src = d),
      g.setAttribute('n', e),
      h.parentNode.insertBefore(g, h));
  })(
    window,
    document,
    'script',
    'https://widgets.sir.sportradar.com/${process.env.NEXT_PUBLIC_SPORTRADAR_TOKEN}/widgetloader',
    'SIR',
    {
      language: 'pt',
    }
  );`
}
