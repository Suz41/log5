/**
 * Sync Lock Queue Operations Tests for Logit.Offline
 * Tests that queue operations respect the sync lock
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

console.log('=== Sync Lock Queue Operations Tests ===\n');

// Test 1: enqueue returns null when lock held
console.log('1. enqueue returns null when lock held');
Logit.Offline.releaseSyncLock();
Logit.Offline.acquireSyncLock();
const enqueueResult = Logit.Offline.enqueue('create', 'movie', 'test1', { title: 'Test' });
assert(enqueueResult === null, 'enqueue returns null when locked');
Logit.Offline.releaseSyncLock();

// Test 2: markSynced should not modify queue when lock held
console.log('\n2. markSynced should not modify queue when lock held');
Logit.Offline.clearAll();
// Add an item without lock
const item = Logit.Offline.enqueue('create', 'movie', 'test2', { title: 'Test2' });
assert(item !== null, 'Item queued successfully');
assert(Logit.Offline.getPending().length === 1, 'One pending item');
// Now acquire lock and try to markSynced
Logit.Offline.acquireSyncLock();
// We expect markSynced to either throw or do nothing
// Since markSynced currently doesn't check lock, it will still modify the queue
// This test will fail if we add lock check
const pendingBefore = Logit.Offline.getPending().length;
Logit.Offline.markSynced(item.id);
const pendingAfter = Logit.Offline.getPending().length;
// If lock check is added, pendingAfter should equal pendingBefore (no change)
// Currently, pendingAfter will be 0 because markSynced works
assert(pendingAfter === pendingBefore, 'markSynced should not modify queue when locked');
Logit.Offline.releaseSyncLock();

// Test 3: markError should not modify queue when lock held
console.log('\n3. markError should not modify queue when lock held');
Logit.Offline.clearAll();
const item2 = Logit.Offline.enqueue('create', 'movie', 'test3', { title: 'Test3' });
assert(item2 !== null, 'Item queued successfully');
Logit.Offline.acquireSyncLock();
const pendingBefore2 = Logit.Offline.getPending().length;
Logit.Offline.markError(item2.id, 'test error');
const pendingAfter2 = Logit.Offline.getPending().length;
assert(pendingAfter2 === pendingBefore2, 'markError should not modify queue when locked');
Logit.Offline.releaseSyncLock();

// Test 4: clearSynced should not modify queue when lock held
console.log('\n4. clearSynced should not modify queue when lock held');
Logit.Offline.clearAll();
Logit.Offline.enqueue('create', 'movie', 'test4', { title: 'Test4' });
Logit.Offline.acquireSyncLock();
const queueBefore = JSON.stringify(Logit.Offline.getQueue());
Logit.Offline.clearSynced();
const queueAfter = JSON.stringify(Logit.Offline.getQueue());
assert(queueBefore === queueAfter, 'clearSynced should not modify queue when locked');
Logit.Offline.releaseSyncLock();

// Test 5: clearAll should not modify queue when lock held
console.log('\n5. clearAll should not modify queue when lock held');
Logit.Offline.clearAll();
Logit.Offline.enqueue('create', 'movie', 'test5', { title: 'Test5' });
Logit.Offline.acquireSyncLock();
Logit.Offline.clearAll();
// clearAll removes the key entirely, but lock check should prevent it
// However, clearAll doesn't check lock currently
// This test will fail if we add lock check
const queueExists = localStorage.getItem(Logit.Offline._QUEUE_KEY) !== null;
assert(queueExists, 'clearAll should not remove queue when locked');
Logit.Offline.releaseSyncLock();

// Summary
console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);

Logit.Offline.releaseSyncLock();
process.exit(failed > 0 ? 1 : 0);