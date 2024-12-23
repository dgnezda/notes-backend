export default function getCoolStuffString(): string {
  return `# Other cool stuff
## KaTeX equations
### Standard Normal Distribution
$$ 
y = \frac{1}{{\sqrt {2\pi } }}e^{ - \frac{{z^2 }}{2}}  = .3989e^{ - 5z^2 }
$$

---

### Euler Constant
$$
e = \mathop {\lim }\limits_{n \to \infty } \left( {1 + \frac{1}{n}} \right)^n
$$

---

## Mermaid charts
### Flowchart
\`\`\`mermaid
flowchart
    A --> B & C & D --> E & F --> G
\`\`\`

---

### Sequence Diagram
\`\`\`mermaid
sequenceDiagram
	Site->>dotmd.ink: initialize
	Site->>dotmd.ink: content loaded
	dotmd.ink->>dotmd.inkAPI: init
\`\`\`
---

### Pie Chart
\`\`\`mermaid
pie title dotmd.ink note documents
    "Work" : 203
    "Personal" : 123
    "Family" : 45
\`\`\`

And many more! Check out the [Mermaid documentation](https://mermaid-js.github.io/mermaid/#/) for more information.
  `
}
// Add nicer looking mermaid charts
