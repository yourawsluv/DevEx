// UI код Figma plugin
figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === "generate-documentation") {
        const selectedNodes = figma.currentPage.selection;
        if (selectedNodes.length === 0) {
            figma.notify("Please select a component.");
            return;
        }

        // Получаем описание компонента
        const componentDescription = selectedNodes[0].name;
        
        try {
            const response = await fetch("http://localhost:3000/generateDocumentation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ componentDescription })
            });
            const documentation = await response.json();
            figma.ui.postMessage({ type: "documentation", documentation });
        } catch (error) {
            figma.notify("Failed to generate documentation");
        }
    }
};
