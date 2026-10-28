  // Fragment 15: lightweight undo/redo history for the single state object.
  const history = {
    past: [],
    future: [],
    current: "",
    timer: 0,
    applying: false,
    max: 40
  };

  function snapshotState() {
    return JSON.stringify(state);
  }

  function resetHistory() {
    clearTimeout(history.timer);
    history.past = [];
    history.future = [];
    history.current = snapshotState();
    history.applying = false;
    updateHistoryControls();
  }

  function recordHistory() {
    if (history.applying) return;
    clearTimeout(history.timer);
    history.timer = setTimeout(recordHistoryNow, 180);
  }

  function recordHistoryNow() {
    clearTimeout(history.timer);
    history.timer = 0;
    if (history.applying) return;
    const snapshot = snapshotState();
    if (!history.current) {
      history.current = snapshot;
      updateHistoryControls();
      return;
    }
    if (snapshot === history.current) return;
    history.past.push(history.current);
    if (history.past.length > history.max) history.past.shift();
    history.current = snapshot;
    history.future = [];
    updateHistoryControls();
  }

  function flushHistory() {
    if (history.timer) recordHistoryNow();
  }

  function restoreHistorySnapshot(snapshot) {
    history.applying = true;
    clearTimeout(renderTimer);
    state = normalizeData(JSON.parse(snapshot));
    renderEditor();
    renderPreview();
    updateStyleControls();
    saveState();
    history.applying = false;
    updateHistoryControls();
  }

  function undo() {
    flushHistory();
    if (!history.past.length) return toast("没有可撤销的操作");
    const current = snapshotState();
    const previous = history.past.pop();
    history.future.push(current);
    history.current = previous;
    restoreHistorySnapshot(previous);
    toast("已撤销");
  }

  function redo() {
    flushHistory();
    if (!history.future.length) return toast("没有可重做的操作");
    const current = snapshotState();
    const next = history.future.pop();
    history.past.push(current);
    history.current = next;
    restoreHistorySnapshot(next);
    toast("已重做");
  }

  function updateHistoryControls() {
    const undoButton = $("#undoButton");
    const redoButton = $("#redoButton");
    if (undoButton) undoButton.disabled = !history.past.length;
    if (redoButton) redoButton.disabled = !history.future.length;
  }
