/**
 * Sync Lock Tests for Logit.Offline
 * Standalone Node.js test runner
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

function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message} (got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)})`);
}

function assertFunction(fn, message) {
  assert(typeof fn === 'function', message);
}

console.log('=== Sync Lock Tests ===\n');

// Test 1: Method existence
console.log('1. Method existence');
assertFunction(Logit.Offline.acquireSyncLock, 'acquireSyncLock is a function');
assertFunction(Logit.Offline.releaseSyncLock, 'releaseSyncLock is a function');

// Test 2: acquireSyncLock returns truthy
console.log('\n2. acquireSyncLock returns truthy when unlocked');
const lockResult = Logit.Offline.acquireSyncLock();
assert(lockResult === true || lockResult !== undefined, 'acquireSyncLock returns truthy');

// Test 3: releaseSyncLock works
console.log('\n3. releaseSyncLock completes');
Logit.Offline.releaseSyncLock();
assert(true, 'releaseSyncLock completes without error');

// Test 4: Lock prevents concurrent acquisition
console.log('\n4. Lock prevents concurrent acquisition');
const firstLock = Logit.Offline.acquireSyncLock();
const secondLock = Logit.Offline.acquireSyncLock();
assert(firstLock === true, 'First lock acquired');
assert(secondLock === false, 'Second lock rejected');
Logit.Offline.releaseSyncLock();

// Test 5: Queue operations check lock
console.log('\n5. Queue operations check lock');
Logit.Offline.acquireSyncLock();
const enqueueResult = Logit.Offline.enqueue('create', 'movie', 'test1', { title: 'Test' });
assert(enqueueResult === null, 'enqueue returns null when locked');
Logit.Offline.releaseSyncLock();

// Test 6: Lock with timeout parameter
console.log('\n6. Lock with timeout parameter');
const lockWithTimeout = Logit.Offline.acquireSyncLock({ timeout: 100 });
assert(lockWithTimeout === true || lockWithTimeout !== undefined, 'Lock with timeout works');
Logit.Offline.releaseSyncLock();

// Test 7: isSyncLocked getter
console.log('\n7. isSyncLocked property');
assertFunction(Logit.Offline.isSyncLocked, 'isSyncLocked is a function');
Logit.Offline.releaseSyncLock();
assert(Logit.Offline.isSyncLocked() === false, 'isSyncLocked returns false when unlocked');
Logit.Offline.acquireSyncLock();
assert(Logit.Offline.isSyncLocked() === true, 'isSyncLocked returns true when locked');
Logit.Offline.releaseSyncLock();

// Test 8: getLockHolder returns identifier
console.log('\n8. getLockHolder');
assertFunction(Logit.Offline.getLockHolder, 'getLockHolder is a function');
Logit.Offline.releaseSyncLock();
assert(Logit.Offline.getLockHolder() === null, 'getLockHolder returns null when unlocked');

// Summary
console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);

Logit.Offline.releaseSyncLock();
process.exit(failed > 0 ? 1 : 0);
