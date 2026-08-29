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
import Queue from "promise-queue";

export const DEFAULT_EPG_GATHERING_CONCURRENCY = 1;

export class EPGGatheringQueue {
    private _queue: Queue;

    constructor(concurrency: number = DEFAULT_EPG_GATHERING_CONCURRENCY) {
        this._queue = new Queue(concurrency, Infinity);
    }

    run<T>(task: () => Promise<T>): Promise<T> {
        return this._queue.add(task);
    }
}

export default EPGGatheringQueue;
