export interface Converter {
    convert(text: string): Promise<string>;
    delete(): void;
}

export interface ConverterBuild {
    adddict(data: string): void;
    group(): void;
    build(): Converter;
}

export function init(input: Response | ArrayBuffer | WebAssembly.Module): Promise<any>;

export function initOpenccRust(): Promise<void>;
export function getConverter(): Converter;
