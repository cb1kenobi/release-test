import fs from 'fs';
import semver from 'semver';
import yaml from 'js-yaml';

const version = process.argv[2] || JSON.parse(fs.readFileSync('package.json', 'utf8')).version || '0.0.0';
const file = './.github/workflows/release.yml';
const doc = yaml.load(fs.readFileSync(file, 'utf8'));
const dest = doc.on.workflow_dispatch.inputs.version;
dest.default = `Patch (${semver.inc(version, 'patch')})`;
dest.options = [ 'Patch', 'Minor', 'Major', 'Prepatch', 'Preminor', 'Premajor' ].map(type => {
	return `${type} (${semver.inc(version, type.toLowerCase())})`;
});
dest.options.push('Custom Version');

console.log(yaml.dump(doc));
