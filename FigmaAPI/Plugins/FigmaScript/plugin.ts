// Показываем UI плагина
figma.showUI(`<html><button id="create-component">Создать компонент</button>
    <button id="generate-documentation">Сгенерировать документацию</button>
    <button id="setup-grid">Настроить сетку</button>
    <script>
        document.getElementById("create-component").onclick = () => {
            parent.postMessage({ pluginMessage: { type: "create-component" } }, "*");
        };
        document.getElementById("generate-documentation").onclick = () => {
            parent.postMessage({ pluginMessage: { type: "generate-documentation" } }, "*");
        };
        document.getElementById("setup-grid").onclick = () => {
            parent.postMessage({ pluginMessage: { type: "setup-grid" } }, "*");
        };
    </script>
</html>`, { width: 250, height: 200 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === "create-component") {
        createComponent();
    } else if (msg.type === "generate-documentation") {
        generateDocumentation();
    } else if (msg.type === "setup-grid") {
        setupGrid();
    }
};

// Функция создания компонента
function createComponent() {
    const frame = figma.createFrame();
    frame.resize(100, 100);
    frame.name = "MyComponent";
    frame.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 1 } }];
    figma.currentPage.appendChild(frame);
    figma.notify("Компонент создан");
}

// Генерация документации на основе имени компонента
function generateDocumentation() {
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
        figma.notify("Выберите компонент для создания документации.");
        return;
    }
    const nodeName = selectedNodes[0].name;
    const documentation = `Документация для ${nodeName}: Это базовый компонент, предназначенный для ...`;
    figma.ui.postMessage({ type: "documentation", documentation });
    figma.notify("Документация создана.");
}

// Настройка сетки для выбранного фрейма
function setupGrid() {
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0 || selectedNodes[0].type !== "FRAME") {
        figma.notify("Выберите фрейм для настройки сетки.");
        return;
    }
    const frame = selectedNodes[0] as FrameNode;
    frame.layoutGrids = [{
        pattern: "COLUMNS",
        sectionSize: 8,
        gutterSize: 16,
        count: 12,
        alignment: "MIN"
    }];
    figma.notify("Сетка настроена.");
}
