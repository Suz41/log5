/**
 * Sync Lock Timeout Tests for Logit.Offline
 * Tests that lock auto-releases after timeout
 */
'use strict';

// Mock browser globals
global.window = global;
global.localStorage = (() => {
  const store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; }
  };
})();
Object.defineProperty(global, 'navigator', { value: { onLine: true }, writable: true, configurable: true });

// Load offline.js source
const fs = require('fs');
const path = require('path');
const offlineSource = fs.readFileSync(path.join(__dirname, '..', 'js', 'offline.js'), 'utf8');
eval(offlineSource);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('=== Sync Lock Timeout Tests ===\n');

  // Test 1: Lock auto-releases after timeout
  console.log('1. Lock auto-releases after timeout');
  Logit.Offline.releaseSyncLock();
  const acquired = Logit.Offline.acquireSyncLock({ timeout: 10 });
  assert(acquired === true, 'Lock acquired with 10ms timeout');
  assert(Logit.Offline.isSyncLocked() === true, 'Lock is locked immediately');
  await sleep(20);
  assert(Logit.Offline.isSyncLocked() === false, 'Lock auto-released after timeout');

  // Test 2: Lock does not auto-release if released before timeout
  console.log('\n2. Lock does not auto-release if released before timeout');
  Logit.Offline.releaseSyncLock();
  Logit.Offline.acquireSyncLock({ timeout: 100 });
  assert(Logit.Offline.isSyncLocked() === true, 'Lock acquired');
  Logit.Offline.releaseSyncLock();
  assert(Logit.Offline.isSyncLocked() === false, 'Lock released manually');
  await sleep(150);
  assert(Logit.Offline.isSyncLocked() === false, 'Lock stays released');

  // Test 3: Lock holder is cleared on timeout
  console.log('\n3. Lock holder is cleared on timeout');
  Logit.Offline.releaseSyncLock();
  Logit.Offline.acquireSyncLock({ timeout: 10, holder: 'test-holder' });
  assert(Logit.Offline.getLockHolder() === 'test-holder', 'Holder set');
  await sleep(20);
  assert(Logit.Offline.getLockHolder() === null, 'Holder cleared after timeout');

  // Test 4: Multiple locks with different timeouts
  console.log('\n4. Multiple locks with different timeouts');
  Logit.Offline.releaseSyncLock();
  Logit.Offline.acquireSyncLock({ timeout: 50 });
  assert(Logit.Offline.isSyncLocked() === true, 'First lock acquired');
  // Try to acquire another lock (should fail)
  const second = Logit.Offline.acquireSyncLock({ timeout: 10 });
  assert(second === false, 'Second lock rejected');
  await sleep(60);
  assert(Logit.Offline.isSyncLocked() === false, 'First lock auto-released');
  // Now we can acquire again
  const third = Logit.Offline.acquireSyncLock({ timeout: 10 });
  assert(third === true, 'Third lock acquired after first released');

  // Summary
  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
  Logit.Offline.releaseSyncLock();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});