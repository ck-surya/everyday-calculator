"""Stage only public files and generate domain-specific search metadata."""
import os
from pathlib import Path
import shutil
from urllib.parse import urlparse
from xml.sax.saxutils import escape

root = Path(__file__).resolve().parent.parent
output = root / '_site'
url = os.environ.get('SITE_URL', '').rstrip('/')
parsed = urlparse(url)
if parsed.scheme != 'https' or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit('Set SITE_URL to the final HTTPS site URL, including any repository path.')
if output.exists():
    shutil.rmtree(output)
output.mkdir()
shutil.copytree(root / 'assets', output / 'assets')
pages = ['index.html', 'about.html', 'privacy.html', '404.html']
for filename in pages:
    text = (root / filename).read_text()
    canonical = url + '/' + ('' if filename == 'index.html' else filename)
    if filename == '404.html':
        # Relative assets and home links must also work for nested missing URLs.
        text = text.replace('<head>', '<head><base href="' + escape(url + '/', {'"': '&quot;'}) + '"><meta name="robots" content="noindex">')
    else:
        text = text.replace('</head>', '<link rel="canonical" href="' + escape(canonical, {'"': '&quot;'}) + '"></head>')
    (output / filename).write_text(text)
(output / '.nojekyll').touch()
(output / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: ' + url + '/sitemap.xml\n')
entries = ''.join('<url><loc>' + escape(url + '/' + p) + '</loc></url>' for p in ['', 'about.html', 'privacy.html'])
(output / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries + '</urlset>')
print('Public site staged in _site/')
