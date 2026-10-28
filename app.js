// ==========================================================================
// ONCE - Lógica y Cálculos Numéricos (Algoritmo C# de Alta Fidelidad)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const NUM_VARIABLES = 11;
  const inputsContainer = document.getElementById("inputs-container");
  const pasteInput = document.getElementById("paste-input");
  const btnApplyPaste = document.getElementById("btn-apply-paste");
  const btnCalculate = document.getElementById("btn-calculate");
  const btnSample = document.getElementById("btn-sample");
  const btnRandom = document.getElementById("btn-random");
  const btnClear = document.getElementById("btn-clear");
  const btnCopySummary = document.getElementById("btn-copy-summary");
  const toast = document.getElementById("toast");

  // Elementos de Resultados
  const v1NumbersChips = document.getElementById("v1-numbers-chips");
  const v1Div3Chips = document.getElementById("v1-div3-chips");
  const v1Div4Chips = document.getElementById("v1-div4-chips");
  const v1Div5Chips = document.getElementById("v1-div5-chips");

  const v2NumbersChips = document.getElementById("v2-numbers-chips");
  const v2Div3Chips = document.getElementById("v2-div3-chips");
  const v2Div4Chips = document.getElementById("v2-div4-chips");
  const v2Div5Chips = document.getElementById("v2-div5-chips");

  const allRepeatsContainer = document.getElementById("all-repeats-container");
  const v1UniqueContainer = document.getElementById("v1-unique-container");

  const kpiV1Count = document.getElementById("kpi-v1-count");
  const kpiTotalOps = document.getElementById("kpi-total-ops");
  const kpiRepeatsCount = document.getElementById("kpi-repeats-count");
  const kpiUniqueCount = document.getElementById("kpi-unique-count");
  const repeatsTotalBadge = document.getElementById("repeats-total-badge");
  const uniqueTotalBadge = document.getElementById("unique-total-badge");

  // Crear dinámicamente los 11 inputs
  function renderInputs() {
    inputsContainer.innerHTML = "";
    for (let i = 0; i < NUM_VARIABLES; i++) {
      const card = document.createElement("div");
      card.className = "var-input-card";

      const badge = document.createElement("span");
      badge.className = "var-badge";
      badge.textContent = `Var ${String(i + 1).padStart(2, "0")}`;

      const input = document.createElement("input");
      input.type = "number";
      input.className = "var-input-field";
      input.id = `var-input-${i}`;
      input.placeholder = "00";
      input.autocomplete = "off";

      input.addEventListener("focus", () => card.classList.add("has-focus"));
      input.addEventListener("blur", () => card.classList.remove("has-focus"));
      
      // Navegación fluida con Enter y flechas
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") {
          const next = document.getElementById(`var-input-${i + 1}`);
          if (next) next.focus();
          else calculateAndDisplay();
        } else if (e.key === "ArrowLeft") {
          const prev = document.getElementById(`var-input-${i - 1}`);
          if (prev) prev.focus();
        }
      });

      card.appendChild(badge);
      card.appendChild(input);
      inputsContainer.appendChild(card);
    }
  }

  // Formato D2 con signo (-08, 05, 12)
  function formatD2(num) {
    const signo = num < 0 ? "-" : "";
    const abs = Math.abs(num);
    return `${signo}${String(abs).padStart(2, "0")}`;
  }

  // Función idéntica a C#: Suma de pares consecutivos y división entera truncada
  function realizarOperaciones(numeros, divisor) {
    const list = [];
    for (let i = 1; i < numeros.length; i++) {
      const suma = numeros[i - 1] + numeros[i];
      const item = Math.trunc(suma / divisor);
      list.push(item);
    }
    return list;
  }

  // Función idéntica a C#: Invierte dígitos con padding a 2 dígitos y conserva signo
  function invertirDigitos(numero) {
    const signo = numero < 0 ? -1 : 1;
    const absoluto = Math.abs(numero);
    const digitos = String(absoluto).padStart(2, "0");
    const invertido = digitos.split("").reverse().join("");
    return signo * parseInt(invertido, 10);
  }

  // Conteo de frecuencias en diccionario
  function countRepeats(numbers) {
    const dict = {};
    for (const n of numbers) {
      dict[n] = (dict[n] || 0) + 1;
    }
    return dict;
  }

  // Renderizar chips dentro de un contenedor
  function renderChips(container, array, colorClass = "") {
    container.innerHTML = "";
    if (!array || array.length === 0) {
      container.innerHTML = `<span class="empty-state">Sin datos</span>`;
      return;
    }
    array.forEach((val) => {
      const chip = document.createElement("span");
      chip.className = `num-chip ${colorClass}`;
      chip.textContent = formatD2(val);
      container.appendChild(chip);
    });
  }

  // Obtener los valores actuales de los 11 inputs
  function getInputs() {
    const values = [];
    for (let i = 0; i < NUM_VARIABLES; i++) {
      const el = document.getElementById(`var-input-${i}`);
      const val = parseInt(el.value, 10);
      values.push(isNaN(val) ? 0 : val);
    }
    return values;
  }

  // Asignar valores a los 11 inputs
  function setInputs(values) {
    for (let i = 0; i < NUM_VARIABLES; i++) {
      const el = document.getElementById(`var-input-${i}`);
      if (el) {
        el.value = values[i] !== undefined ? values[i] : "";
      }
    }
    calculateAndDisplay();
  }

  // Ejecución del Cálculo y Renderizado
  function calculateAndDisplay() {
    const vector1 = getInputs();

    // Vector 1 Operaciones
    const v1Div3 = realizarOperaciones(vector1, 3);
    const v1Div4 = realizarOperaciones(vector1, 4);
    const v1Div5 = realizarOperaciones(vector1, 5);

    // Vector 2: Números invertidos
    const vector2 = vector1.map(invertirDigitos);
    const v2Div3 = realizarOperaciones(vector2, 3);
    const v2Div4 = realizarOperaciones(vector2, 4);
    const v2Div5 = realizarOperaciones(vector2, 5);

    // Resultados de todas las operaciones (60 en total: 10 * 3 + 10 * 3)
    const todasLasOperaciones = [
      ...v1Div3, ...v1Div4, ...v1Div5,
      ...v2Div3, ...v2Div4, ...v2Div5
    ];

    const repeatsDict = countRepeats(todasLasOperaciones);
    const sortedRepeats = Object.entries(repeatsDict)
      .map(([k, v]) => ({ key: parseInt(k, 10), count: v }))
      .filter((item) => item.count > 1)
      .sort((a, b) => a.key - b.key);

    // Valores en Vector 1 que se repiten exactamente 1 vez
    const v1TodasOps = [...v1Div3, ...v1Div4, ...v1Div5];
    const v1Dict = countRepeats(v1TodasOps);
    const v1Unicos = Object.entries(v1Dict)
      .map(([k, v]) => ({ key: parseInt(k, 10), count: v }))
      .filter((item) => item.count === 1)
      .sort((a, b) => a.key - b.key);

    // Renderizar Chips
    renderChips(v1NumbersChips, vector1);
    renderChips(v1Div3Chips, v1Div3);
    renderChips(v1Div4Chips, v1Div4);
    renderChips(v1Div5Chips, v1Div5);

    renderChips(v2NumbersChips, vector2);
    renderChips(v2Div3Chips, v2Div3);
    renderChips(v2Div4Chips, v2Div4);
    renderChips(v2Div5Chips, v2Div5);

    // Renderizar Lista de Repeticiones (> 1 vez)
    allRepeatsContainer.innerHTML = "";
    if (sortedRepeats.length === 0) {
      allRepeatsContainer.innerHTML = `<div class="empty-state">No hay números que se repitan más de una vez.</div>`;
    } else {
      const maxCount = Math.max(...sortedRepeats.map(r => r.count));
      sortedRepeats.forEach((item) => {
        const row = document.createElement("div");
        row.className = "repeat-row";

        const pct = Math.round((item.count / maxCount) * 100);

        row.innerHTML = `
          <span class="repeat-num">${formatD2(item.key)}</span>
          <div class="repeat-bar-wrapper">
            <div class="repeat-bar" style="width: ${pct}%"></div>
          </div>
          <span class="repeat-count-tag">${item.count} veces</span>
        `;
        allRepeatsContainer.appendChild(row);
      });
    }

    // Renderizar Valores Únicos en Vector 1
    v1UniqueContainer.innerHTML = "";
    if (v1Unicos.length === 0) {
      v1UniqueContainer.innerHTML = `<div class="empty-state">No hay resultados que se repitan exactamente 1 vez.</div>`;
    } else {
      v1Unicos.forEach((item) => {
        const chip = document.createElement("span");
        chip.className = "unique-chip";
        chip.innerHTML = `
          <span>${formatD2(item.key)}</span>
        `;
        v1UniqueContainer.appendChild(chip);
      });
    }

    // Actualizar KPIs
    kpiV1Count.textContent = vector1.length;
    kpiTotalOps.textContent = todasLasOperaciones.length;
    kpiRepeatsCount.textContent = sortedRepeats.length;
    kpiUniqueCount.textContent = v1Unicos.length;
    repeatsTotalBadge.textContent = `${sortedRepeats.length} valores repetidos`;
    uniqueTotalBadge.textContent = `${v1Unicos.length} valores únicos`;
  }

  // Toast Helper
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  // Generar Copia de Resumen en Formato de Consola
  function generateTextSummary() {
    const vector1 = getInputs();
    const v1Div3 = realizarOperaciones(vector1, 3);
    const v1Div4 = realizarOperaciones(vector1, 4);
    const v1Div5 = realizarOperaciones(vector1, 5);

    const vector2 = vector1.map(invertirDigitos);
    const v2Div3 = realizarOperaciones(vector2, 3);
    const v2Div4 = realizarOperaciones(vector2, 4);
    const v2Div5 = realizarOperaciones(vector2, 5);

    const todasLasOperaciones = [...v1Div3, ...v1Div4, ...v1Div5, ...v2Div3, ...v2Div4, ...v2Div5];
    const repeatsDict = countRepeats(todasLasOperaciones);
    const sortedRepeats = Object.entries(repeatsDict)
      .map(([k, v]) => ({ key: parseInt(k, 10), count: v }))
      .filter((item) => item.count > 1)
      .sort((a, b) => a.key - b.key);

    const v1TodasOps = [...v1Div3, ...v1Div4, ...v1Div5];
    const v1Dict = countRepeats(v1TodasOps);
    const v1Unicos = Object.entries(v1Dict)
      .map(([k, v]) => ({ key: parseInt(k, 10), count: v }))
      .filter((item) => item.count === 1)
      .sort((a, b) => a.key - b.key);

    let text = "========================================================\n";
    text += "                  REPORTE DE SISTEMA ONCE\n";
    text += "========================================================\n\n";

    text += "Numeros ingresados (Vector 1):\n";
    text += vector1.map(formatD2).join(", ") + "\n\n";

    text += " ** Resultados para el Vector1: ** \n";
    text += "Con el numero 3: " + v1Div3.map(formatD2).join(", ") + "\n";
    text += "Con el numero 4: " + v1Div4.map(formatD2).join(", ") + "\n";
    text += "Con el numero 5: " + v1Div5.map(formatD2).join(", ") + "\n\n";

    text += " ** Resultados para el Vector2 - con digitos invertidos: ** \n";
    text += "Numeros en el Vector2:\n" + vector2.map(formatD2).join(", ") + "\n";
    text += "Con el numero 3: " + v2Div3.map(formatD2).join(", ") + "\n";
    text += "Con el numero 4: " + v2Div4.map(formatD2).join(", ") + "\n";
    text += "Con el numero 5: " + v2Div5.map(formatD2).join(", ") + "\n\n";

    text += " ** Resultados de todas las operaciones (Repetidos > 1): ** \n";
    sortedRepeats.forEach(r => {
      text += `${formatD2(r.key)} se repite: ${r.count} veces\n`;
    });

    text += "\nResultados en Vector1 que se repiten 1 vez:\n";
    v1Unicos.forEach(u => {
      text += `${formatD2(u.key)} se repite 1 vez\n`;
    });

    return text;
  }

  // Event Listeners
  btnCalculate.addEventListener("click", calculateAndDisplay);

  btnSample.addEventListener("click", () => {
    const sample = [12, 45, 8, 23, 7, 19, 34, 11, 5, 42, 16];
    setInputs(sample);
    showToast("Valores de ejemplo cargados");
  });

  btnRandom.addEventListener("click", () => {
    const randoms = Array.from({ length: NUM_VARIABLES }, () => Math.floor(Math.random() * 50) + 1);
    setInputs(randoms);
    showToast("11 valores aleatorios generados");
  });

  btnClear.addEventListener("click", () => {
    for (let i = 0; i < NUM_VARIABLES; i++) {
      const el = document.getElementById(`var-input-${i}`);
      if (el) el.value = "";
    }
    if (pasteInput) pasteInput.value = "";
    calculateAndDisplay();
    showToast("Casillas limpiadas");
  });

  btnApplyPaste.addEventListener("click", () => {
    const raw = pasteInput.value.trim();
    if (!raw) return;
    const parts = raw.split(/[\s,;]+/).map(v => parseInt(v, 10)).filter(v => !isNaN(v));
    if (parts.length === 0) {
      showToast("No se encontraron números válidos");
      return;
    }
    const filled = parts.slice(0, NUM_VARIABLES);
    while (filled.length < NUM_VARIABLES) filled.push(0);
    setInputs(filled);
    showToast(`${parts.slice(0, NUM_VARIABLES).length} números cargados`);
  });

  btnCopySummary.addEventListener("click", () => {
    const text = generateTextSummary();
    navigator.clipboard.writeText(text).then(() => {
      showToast("¡Resumen copiado al portapapeles!");
    }).catch(() => {
      showToast("No se pudo copiar automáticamente");
    });
  });

  // Inicializar con valores de ejemplo
  renderInputs();
  setInputs([12, 45, 8, 23, 7, 19, 34, 11, 5, 42, 16]);
});
