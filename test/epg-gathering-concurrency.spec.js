/*
   Copyright 2016 kanreisa

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
const assert = require("node:assert/strict");
const test = require("node:test");
const {
    DEFAULT_EPG_GATHERING_CONCURRENCY,
    EPGGatheringQueue
} = require("../lib/Mirakurun/EPGGatheringQueue");

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

test("EPG gathering jobs run sequentially by default", async () => {
    const queue = new EPGGatheringQueue();
    let running = 0;
    let maxRunning = 0;

    await Promise.all(Array.from({ length: 4 }, (_, index) => queue.run(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await sleep(10);
        running--;
        return index;
    })));

    assert.equal(DEFAULT_EPG_GATHERING_CONCURRENCY, 1);
    assert.equal(maxRunning, 1);
});

test("EPG gathering concurrency is configurable", async () => {
    const queue = new EPGGatheringQueue(2);
    let running = 0;
    let maxRunning = 0;

    await Promise.all(Array.from({ length: 6 }, () => queue.run(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await sleep(10);
        running--;
    })));

    assert.equal(maxRunning, 2);
});
