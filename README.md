## Структура проекта
  
## General Coding practices
In general, the established linter should take care of most issues, but in general:
- ES6 javascript standards
- Imports should be well organized and alphabetical
- Deconstructed variables should be alphabetical
- Comments to override the linter will be rejected
- Props shall be organized and in alphabetical order

### Naming standards
- Descriptive variable names, method names and component names are mandatory.  Someone reading your code should know exactly what it's doing purely based on names.
- In general, if a prop is calling a method, the prefix "handle" should be appended to the prop name. (i.e. prop: onClose, method name: handleOnClose)
- Readable is more important than elegant.  If a solution can be written in 1 line of elegant code that requires a trip into the JavaScript documentation to figure out, or a 3 line solution that's easy to read and understand, the 3 line solution is preferred.

## Pull Request Process
- Check your local environment before creating a pull request.  Code with compile errors will be immediately rejected.
- Prior to making a pull request, squash your commits down to one.  [Squash Commits](https://www.git-tower.com/learn/git/faq/git-squash/)
- When you are complete with your feature work, a pull request should be created comparing your feature branch to the branch instructed via the task.
- Your PR should be titled in the following manner: **TBD**
- All questions on the pull request template should be answered according to the instructions in the template
