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
import { promisify } from "util";
import * as yieldableJSON from "yieldable-json";

const stringifyAsync = promisify(yieldableJSON.stringifyAsync);
const invalidControlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g;

/**
 * yieldable-json 2.1.0 can emit unescaped control characters, which makes the
 * result invalid JSON. Escape only characters that JSON does not permit raw;
 * valid JSON whitespace (tab, LF and CR) is left untouched.
 */
export async function stringifyJSON(value: any): Promise<string> {
    const json = await stringifyAsync(value) as string;
    return json.replace(invalidControlCharacters, character => {
        return "\\u" + character.charCodeAt(0).toString(16).padStart(4, "0");
    });
}
