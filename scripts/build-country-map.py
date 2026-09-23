# Sources: https://data.unesco.org/explore/dataset/whc001/
# https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson
import json,re,math,argparse
from pathlib import Path
parser=argparse.ArgumentParser(description='Build local map geometry from UNESCO whc001 JSON export and Natural Earth 50m admin-0 GeoJSON.')
parser.add_argument('unesco_json')
parser.add_argument('countries_geojson')
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
sites=json.loads((root/'dist/heritage-data.json').read_text())['languages']['en']['sites']
rows={r['id_no']:r for r in json.load(open(args.unesco_json))}
features=json.load(open(args.countries_geojson))['features']
def project(lon,lat):
 m=math.sqrt(3)/2;t=math.asin(m*math.sin(math.radians(lat)));t2=t*t;t6=t2**3
 return [round(500+170*(math.radians(lon)*math.cos(t)/(m*(1.340264-3*.081106*t2+t6*(7*.000893+9*.003796*t2)))),3),round(250-170*t*(1.340264-.081106*t2+t6*(.000893+.003796*t2)),3)]
def iso(f):
 p=f['properties'];return p['ISO_A2'] if p['ISO_A2']!='-99' else p.get('ISO_A2_EH')
byiso={iso(f):f for f in features}
def rings(f):
 g=f['geometry'];return g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
def inside(lon,lat,f):
 for poly in rings(f):
  ring=poly[0];hit=False
  for a,b in zip(ring,ring[1:]+ring[:1]):
   if (a[1]>lat)!=(b[1]>lat) and lon<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0]:hit=not hit
  if hit:return True
 return False
names={}
for f in features:
 for k in ['ADMIN','NAME','NAME_EN','NAME_LONG']:
  names[f['properties'][k]]=iso(f)
names.update({'Türkiye':'TR','The Gambia':'GM','Czechia':'CZ'})
points={}
for s in sites:
 r=rows[s['id']];codes=[c.strip() for c in r['iso_codes'].split(',')]
 parsed=re.findall(r'\{name: (.*?), ref: (.*?), latitude: ([\d.eE+-]+), longitude: ([\d.eE+-]+)\}',r['components_list'] or '')
 ps=[]
 for name,ref,lat,lon in parsed:
  lon=float(lon);lat=float(lat)
  if not (-180<=lon<=180 and -90<=lat<=90):continue
  code=next((c for c in codes if c in byiso and inside(lon,lat,byiso[c])),codes[0] if len(codes)==1 else None)
  if code is None:
   code=min((c for c in codes if c in byiso),key=lambda c:min((lon-x)**2+(lat-y)**2 for poly in rings(byiso[c]) for x,y in poly[0]))
  ps.append([*project(lon,lat),code,name])
 if not ps:
  p=r['coordinates']
  if not p:
   points[s['id']]=[]
   continue
  ps=[[*project(p['lon'],p['lat']),codes[0],r['name_en']]]
 points[s['id']]=ps
paths=[]
for f in features:
 d=''
 for poly in rings(f):
  for ring in poly:
   xy=[project(*p) for p in ring]
   d+='M'+'L'.join(f'{x},{y}' for x,y in xy)+'Z'
 paths.append([iso(f),d])
out={'source':'https://data.unesco.org/explore/dataset/whc001/','retrieved':'2026-09-23','countries':names,'points':points,'paths':paths}
(root/'dist/country-map-data.js').write_text('/* UNESCO World Heritage coordinates; Natural Earth 1:50m country boundaries (public domain). */\nconst COUNTRY_MAP_DATA='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(points),'properties;',sum(map(len,points.values())),'locations')
