# zuzu-syntax

Syntax highlighting support for ZuzuScript in Visual Studio Code.

## Features

- Highlights `.zzs` and `.zzm` files.
- Highlights ZuzuScript keywords, operators, comments, strings,
	numbers, booleans, null, and set literals.
- Handles POD sections (`=head1` ... `=cut`) as documentation blocks.
- Supports bracket/comment behavior through VS Code language
	configuration.

## Install for local development

1. Open this folder in VS Code:
	`extras/vscode/zuzu-syntax`
2. Run command palette action:
	`Developer: Install Extension from Location...`
3. Choose `extras/vscode/zuzu-syntax`.

## Notes

This extension currently provides syntax highlighting only.
