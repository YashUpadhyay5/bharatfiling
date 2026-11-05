import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INDUSTRY_CONTENT } from '../../../frontend/src/data/industryContent.js';
import { getService, servicePath } from '../../../frontend/src/data/serviceCatalog.js';

const slidesSource = readFileSync(new URL('../../../frontend/src/components/home/industrySolutions.js', import.meta.url), 'utf8');
const slideIds = [...slidesSource.matchAll(/^\s+id: '([^']+)',/gm)].map((m) => m[1]);

test('every home-page slide has its own page content, and no page is orphaned', () => {
  assert.equal(slideIds.length, 7);
  assert.deepEqual(Object.keys(INDUSTRY_CONTENT).sort(), [...slideIds].sort());
});

for (const [id, content] of Object.entries(INDUSTRY_CONTENT)) {
  test(`${id}: every service on the page exists in the catalogue and has a link`, () => {
    assert.equal(content.stages.length, 3);
    const slugs = content.stages.flatMap((stage) => stage.services);
    assert.equal(new Set(slugs).size, slugs.length, 'a service is listed twice');
    for (const slug of [...slugs, content.expertService]) {
      const svc = getService(slug);
      assert.ok(svc, `${slug} is not in serviceCatalog.js`);
      assert.equal(svc.slug, slug, `${slug} is an alias; use ${svc.slug}`);
      assert.match(servicePath(svc), /^\/(services|tools)\//);
    }
  });

  test(`${id}: page copy has no hardcoded fee, so catalogue prices stay the only source`, () => {
    const copy = [content.headline, content.intro, ...content.needs, ...content.expertTopics].join(' ');
    assert.doesNotMatch(copy, /₹|Rs\.?\s?\d/);
    assert.ok(content.faqs.length >= 3);
  });
}
