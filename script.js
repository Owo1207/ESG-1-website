const syncSelection = (inputs, labels) => {
  labels.forEach((label) => {
    const isChecked = document.getElementById(label.htmlFor)?.checked;
    label.setAttribute("aria-selected", isChecked ? "true" : "false");
    label.tabIndex = isChecked ? 0 : -1;
  });
};

const enableArrowNavigation = (inputs, labels) => {
  const total = inputs.length;

  labels.forEach((label) => {
    label.addEventListener("keydown", (event) => {
      const currentId = label.htmlFor;
      const index = inputs.findIndex((input) => input.id === currentId);
      if (index === -1) return;

      const move = event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;

      if (!move) return;
      event.preventDefault();

      const nextIndex = (index + move + total) % total;
      const nextInput = inputs[nextIndex];
      nextInput.checked = true;
      nextInput.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector(`label[for="${nextInput.id}"]`)?.focus();
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const tabInputs = Array.from(document.querySelectorAll("input[name='tabs']"));
  const tabLabels = Array.from(document.querySelectorAll(".tab-labels label"));
  const monthInputs = Array.from(document.querySelectorAll("input[name='month']"));
  const monthLabels = Array.from(document.querySelectorAll(".subfilters label"));

  const syncTabs = () => syncSelection(tabInputs, tabLabels);
  const syncMonths = () => syncSelection(monthInputs, monthLabels);

  tabInputs.forEach((input) => input.addEventListener("change", syncTabs));
  monthInputs.forEach((input) => input.addEventListener("change", syncMonths));

  enableArrowNavigation(tabInputs, tabLabels);
  enableArrowNavigation(monthInputs, monthLabels);

  syncTabs();
  syncMonths();
});
