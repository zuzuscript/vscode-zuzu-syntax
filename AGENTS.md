# AGENTS.md

## Repository Scope

This repository contains the VS Code ZuzuScript syntax extension in
`zuzu-syntax/`.

Keep future work self-contained. Do not use sibling directories as language
references. The local submodules provide the source material:

- `docs/userguide/zuzuscript-guide/AA-bnf.md`
- `docs/userguide/zuzuscript-guide/AB-operator-precedence.md`
- `docs/userguide/operators-table.html`
- `docs/examples/*.zzs`

If those paths are missing, initialize the submodules before making syntax
decisions.

## Keeping Syntax Current

Update `zuzu-syntax/syntaxes/zuzu.tmLanguage.json` from the local BNF and
operator appendix. Check:

- current reserved words and contextual words;
- stale words that should no longer receive keyword/operator scopes;
- word-like and symbolic operators, including Unicode aliases;
- assignment, path, lambda, dynamic member-call, collection, floor/ceil,
  and bag/set delimiters;
- string, binary-string, template, regexp, number, boolean, null, and
  empty-set literals;
- embedded POD and comments.

Update `zuzu-syntax/language-configuration.json` when syntax changes affect
brackets, autoclosing pairs, indentation, or folding. Folding markers should
cover class, trait, function, and method blocks without interfering with
ordinary brace folding.

## Validation

At minimum, parse all JSON files:

```bash
node -e "for (const f of ['zuzu-syntax/package.json','zuzu-syntax/language-configuration.json','zuzu-syntax/syntaxes/zuzu.tmLanguage.json']) JSON.parse(require('fs').readFileSync(f, 'utf8'))"
```

If `vscode-textmate` and `vscode-oniguruma` are available, run a real
TextMate tokenization check. Otherwise, run focused static regex checks
against representative current syntax and stale words.

Keep validation examples drawn from the local userguide and
`docs/examples`.
