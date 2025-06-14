import { ConverterBuild, init } from "./opencc-rust-lib.mjs";

const RESOURCES = {
    opencc_wasm: "https://cdn.jsdelivr.net/gh/polyproline/opencc-wasm@main/opencc_gc.wasm",
    HKVariants: "https://cdn.jsdelivr.net/npm/opencc-data/data/HKVariants.txt",
    HKVariantsRev: "https://cdn.jsdelivr.net/npm/opencc-data/data/HKVariantsRev.txt",
    HKVariantsRevPhrases: "https://cdn.jsdelivr.net/npm/opencc-data/data/HKVariantsRevPhrases.txt",
    JPShinjitaiCharacters: "https://cdn.jsdelivr.net/npm/opencc-data/data/JPShinjitaiCharacters.txt",
    JPShinjitaiPhrases: "https://cdn.jsdelivr.net/npm/opencc-data/data/JPShinjitaiPhrases.txt",
    JPVariants: "https://cdn.jsdelivr.net/npm/opencc-data/data/JPVariants.txt",
    JPVariantsRev: "https://cdn.jsdelivr.net/npm/opencc-data/data/JPVariantsRev.txt",
    STCharacters: "https://cdn.jsdelivr.net/npm/opencc-data/data/STCharacters.txt",
    STPhrases: "https://cdn.jsdelivr.net/npm/opencc-data/data/STPhrases.txt",
    TSCharacters: "https://cdn.jsdelivr.net/npm/opencc-data/data/TSCharacters.txt",
    TSPhrases: "https://cdn.jsdelivr.net/npm/opencc-data/data/TSPhrases.txt",
    TWPhrasesIT: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWPhrasesIT.txt",
    TWPhrasesName: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWPhrasesName.txt",
    TWPhrasesOther: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWPhrasesOther.txt",
    TWPhrasesRev: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWPhrasesRev.txt",
    TWVariants: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWVariants.txt",
    TWVariantsRev: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWVariantsRev.txt",
    TWVariantsRevPhrases: "https://cdn.jsdelivr.net/npm/opencc-data/data/TWVariantsRevPhrases.txt"
};

const CONVERTION_MAP = {
    ToSimple: [
      ["HKVariantsRevPhrases", "HKVariantsRev"],
      ["TWPhrasesRev", "TWVariantsRevPhrases", "TWVariantsRev"],
      ["TSPhrases", "TSCharacters"]
    ],
    ToTraditional: [
      ["TWVariantsRevPhrases", "TWVariantsRev"],
      ["HKVariantsRevPhrases", "HKVariantsRev"],
      ["JPShinjitaiPhrases", "JPShinjitaiCharacters", "JPVariantsRev"],
      ["STPhrases", "STCharacters"]
    ],
    ToTaiwan: [
      ["STPhrases", "STCharacters"],
      "TWVariants",
      ["TWPhrasesIT", "TWPhrasesName", "TWPhrasesOther"]
    ],
    ToHongKong: [
      ["STPhrases", "STCharacters"],
      "HKVariants"
    ]
};

const SELECTED_DICT = CONVERTION_MAP.ToTaiwan;

let _converter = null;

async function initOpenccRust() {
    const wasm = await fetch(RESOURCES.opencc_wasm);
    await init(wasm);

    const build = ConverterBuild.new();
    for (let dict of SELECTED_DICT) {
        if (Array.isArray(dict)) {
            for(let d of dict) {
                build.adddict(await fetch(RESOURCES[d]).then(response => response.text()));
            }
        } else {
            build.adddict(await fetch(RESOURCES[dict]).then(response => response.text()));
        }
        build.group();
    }
    _converter = build.build();
}

function getConverter() {
    if (!_converter) throw new Error("You must call and await initOpenccRust() first.");
    return _converter;
}

export { initOpenccRust, getConverter };
