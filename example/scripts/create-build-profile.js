/*
 * postinstall: 从 build-profile.template.json5 生成 harmony/build-profile.json5，
 * 保留已有的 signingConfigs（签名配置不进 git）。
 */


const fs = require('fs');
const JSON5 = require('json5');
const path = require('path');

const templatePath = path.join(
  __dirname,
  '..',
  'harmony',
  'build-profile.template.json5',
);
const existingProfilePath = path.join(
  __dirname,
  '..',
  'harmony',
  'build-profile.json5',
);

if (fs.existsSync(existingProfilePath)) {
  let existingProfile = JSON5.parse(
    fs.readFileSync(existingProfilePath, 'utf-8'),
  );
  let template = JSON5.parse(fs.readFileSync(templatePath, 'utf-8'));
  let signingConfigs =
    existingProfile.app && existingProfile.app.signingConfigs;

  existingProfile = {...template};

  if (signingConfigs) {
    existingProfile.app.signingConfigs = signingConfigs;
  }

  fs.writeFileSync(
    existingProfilePath,
    JSON5.stringify(existingProfile, null, 2),
  );
} else {
  // File doesn't exist, create a copy from the template
  fs.copyFileSync(templatePath, existingProfilePath);
}
