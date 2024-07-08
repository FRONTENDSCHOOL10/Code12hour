export const defineCustomElements = (elements) => {
  elements.forEach(([name, element]) => {
    if (!customElements.get(name)) {
      customElements.define(name, element);
    }
  });
};

export const appendCustomElement = (parent, elementName) => {
  const element = document.createElement(elementName);
  parent.append(element);
};
