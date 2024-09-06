export default function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    res.end(`
    User-agent: *
    Disallow: /admin
    Allow: /
  `)
}