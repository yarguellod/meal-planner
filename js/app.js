// Estado global de la aplicación
const app = {
    recetas: {
        desayunos: [],
        almuerzos: []
    },
    planSemanal: {},
    semanasGuardadas: [],
    currentDay: null,
    currentMeal: null
};

// Días de la semana
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const COMIDAS = ['desayuno', 'almuerzo', 'cena'];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    await cargarRecetas();
    cargarSemanasGuardadas();
    inicializarTabs();
    renderizarPlanificador();
    renderizarRecetas();
    setupEventListeners();
});

// Cargar recetas desde archivos JSON
async function cargarRecetas() {
    try {
        const [desayunosRes, almuerzosRes] = await Promise.all([
            fetch('recipes/desayunos/recetas-desayunos.json'),
            fetch('recipes/almuerzos-cenas/recetas-almuerzos-cenas.json')
        ]);
        
        app.recetas.desayunos = await desayunosRes.json();
        app.recetas.almuerzos = await almuerzosRes.json();
    } catch (error) {
        console.error('Error cargando recetas:', error);
        mostrarNotificacion('Error al cargar las recetas', 'error');
    }
}

// Inicializar sistema de tabs
function inicializarTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar todos los tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activar el tab seleccionado
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Actualizar contenido según el tab
            if (tabId === 'lista-compras') {
                generarListaCompras();
            } else if (tabId === 'semanas-guardadas') {
                renderizarSemanasGuardadas();
            }
        });
    });
}

// Renderizar el planificador semanal
function renderizarPlanificador() {
    const daysGrid = document.querySelector('.days-grid');
    daysGrid.innerHTML = '';
    
    DIAS.forEach(dia => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">${dia}</div>
            ${COMIDAS.map(comida => {
                const recetaId = app.planSemanal[dia]?.[comida];
                const receta = recetaId ? buscarReceta(recetaId) : null;
                const isFilled = receta !== null;
                
                return `
                    <div class="meal-slot ${isFilled ? 'filled' : ''}" data-dia="${dia}" data-comida="${comida}">
                        <div class="meal-label">${capitalize(comida)}</div>
                        <div class="meal-content">
                            <div class="meal-name">
                                ${receta ? receta.nombre : 'Click para agregar'}
                            </div>
                            <div class="meal-actions">
                                ${!receta ? `
                                    <button class="btn-icon btn-add" onclick="abrirSelectorReceta('${dia}', '${comida}')">+</button>
                                ` : `
                                    <button class="btn-icon" onclick="verDetalleReceta('${receta.id}')">👁️</button>
                                    <button class="btn-icon btn-remove" onclick="removerReceta('${dia}', '${comida}')">✕</button>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
        daysGrid.appendChild(dayCard);
    });
}

// Buscar receta por ID
function buscarReceta(id) {
    const todasRecetas = [...app.recetas.desayunos, ...app.recetas.almuerzos];
    return todasRecetas.find(r => r.id === id);
}

// Abrir selector de recetas
function abrirSelectorReceta(dia, comida) {
    app.currentDay = dia;
    app.currentMeal = comida;
    
    const modal = document.getElementById('seleccionarRecetaModal');
    const content = document.getElementById('seleccionarRecetaContent');
    
    // Filtrar recetas según el tipo de comida
    const recetasFiltradas = comida === 'desayuno' 
        ? app.recetas.desayunos 
        : [...app.recetas.almuerzos];
    
    content.innerHTML = `
        <h2>Selecciona una receta para ${capitalize(comida)} - ${dia}</h2>
        <input type="text" class="search-input" placeholder="🔍 Buscar receta..." id="buscarRecetaModal" style="margin: 20px 0;">
        <div class="recipes-grid" id="selectorRecetasGrid">
            ${recetasFiltradas.map(receta => `
                <div class="recipe-card" onclick="seleccionarReceta('${receta.id}')">
                    <div class="recipe-header">
                        <div class="recipe-name">${receta.nombre}</div>
                    </div>
                    <div class="recipe-base">${receta.base}</div>
                    <div class="recipe-info">👥 ${receta.porciones} porciones</div>
                    <div class="recipe-categories">
                        ${receta.categorias.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('show');
    
    // Agregar funcionalidad de búsqueda
    document.getElementById('buscarRecetaModal').addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const grid = document.getElementById('selectorRecetasGrid');
        const recetasFiltradas = (comida === 'desayuno' ? app.recetas.desayunos : app.recetas.almuerzos)
            .filter(r => r.nombre.toLowerCase().includes(termino) || r.base.toLowerCase().includes(termino));
        
        grid.innerHTML = recetasFiltradas.map(receta => `
            <div class="recipe-card" onclick="seleccionarReceta('${receta.id}')">
                <div class="recipe-header">
                    <div class="recipe-name">${receta.nombre}</div>
                </div>
                <div class="recipe-base">${receta.base}</div>
                <div class="recipe-info">👥 ${receta.porciones} porciones</div>
                <div class="recipe-categories">
                    ${receta.categorias.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
            </div>
        `).join('');
    });
}

// Seleccionar receta para el día
function seleccionarReceta(recetaId) {
    if (!app.planSemanal[app.currentDay]) {
        app.planSemanal[app.currentDay] = {};
    }
    app.planSemanal[app.currentDay][app.currentMeal] = recetaId;
    
    cerrarModal('seleccionarRecetaModal');
    renderizarPlanificador();
    mostrarNotificacion('Receta agregada al planificador', 'success');
}

// Remover receta del plan
function removerReceta(dia, comida) {
    if (app.planSemanal[dia] && app.planSemanal[dia][comida]) {
        delete app.planSemanal[dia][comida];
        if (Object.keys(app.planSemanal[dia]).length === 0) {
            delete app.planSemanal[dia];
        }
        renderizarPlanificador();
        mostrarNotificacion('Receta removida', 'success');
    }
}

// Ver detalle de receta
function verDetalleReceta(recetaId) {
    const receta = buscarReceta(recetaId);
    if (!receta) return;
    
    const modal = document.getElementById('recetaModal');
    const content = document.getElementById('recetaDetalles');
    
    content.innerHTML = `
        <div class="recipe-detail">
            <h2>${receta.nombre}</h2>
            <div class="recipe-detail-info">
                <div><strong>Base:</strong> ${receta.base}</div>
                <div><strong>Porciones:</strong> ${receta.porciones}</div>
                <div><strong>Conservación:</strong> ${receta.conservacion}</div>
            </div>
            <h3>Ingredientes</h3>
            <ul>
                ${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h3>Preparación</h3>
            <p>${receta.preparacion}</p>
        </div>
    `;
    
    modal.classList.add('show');
}

// Renderizar todas las recetas
function renderizarRecetas() {
    const grid = document.getElementById('recetasGrid');
    const todasRecetas = [...app.recetas.desayunos, ...app.recetas.almuerzos];
    
    grid.innerHTML = todasRecetas.map(receta => `
        <div class="recipe-card" onclick="verDetalleReceta('${receta.id}')">
            <div class="recipe-header">
                <div class="recipe-name">${receta.nombre}</div>
            </div>
            <div class="recipe-base">${receta.base}</div>
            <div class="recipe-info">👥 ${receta.porciones} porciones • ⏰ ${receta.conservacion}</div>
            <div class="recipe-categories">
                ${receta.categorias.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Generar lista de compras
function generarListaCompras() {
    const container = document.getElementById('listaComprasContent');
    
    // Obtener todas las recetas del plan
    const recetasEnPlan = [];
    Object.values(app.planSemanal).forEach(dia => {
        Object.values(dia).forEach(recetaId => {
            const receta = buscarReceta(recetaId);
            if (receta) recetasEnPlan.push(receta);
        });
    });
    
    if (recetasEnPlan.length === 0) {
        container.innerHTML = '<p class="empty-state">Agrega recetas a tu planificador para generar la lista de compras</p>';
        return;
    }
    
    // Agrupar ingredientes
    const ingredientesPorCategoria = {
        'Proteínas': [],
        'Verduras y Frutas': [],
        'Carbohidratos': [],
        'Lácteos': [],
        'Especias y Condimentos': [],
        'Otros': []
    };
    
    recetasEnPlan.forEach(receta => {
        receta.ingredientes.forEach(ing => {
            const categoria = categorizarIngrediente(ing);
            if (!ingredientesPorCategoria[categoria].includes(ing)) {
                ingredientesPorCategoria[categoria].push(ing);
            }
        });
    });
    
    container.innerHTML = Object.entries(ingredientesPorCategoria)
        .filter(([_, items]) => items.length > 0)
        .map(([categoria, items]) => `
            <div class="shopping-section">
                <h3>${categoria}</h3>
                <ul>
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
}

// Categorizar ingredientes
function categorizarIngrediente(ingrediente) {
    const ing = ingrediente.toLowerCase();
    
    if (ing.includes('huevo') || ing.includes('pollo') || ing.includes('carne') || 
        ing.includes('atún') || ing.includes('salmón') || ing.includes('pescado') ||
        ing.includes('panceta')) return 'Proteínas';
    
    if (ing.includes('queso') || ing.includes('yogurt') || ing.includes('cottage') ||
        ing.includes('mozzarella') || ing.includes('ricota') || ing.includes('parmesano') ||
        ing.includes('leche')) return 'Lácteos';
    
    if (ing.includes('cebolla') || ing.includes('tomate') || ing.includes('lechuga') ||
        ing.includes('espinaca') || ing.includes('champiñon') || ing.includes('morrón') ||
        ing.includes('zanahoria') || ing.includes('brócoli') || ing.includes('coliflor') ||
        ing.includes('zucchini') || ing.includes('berenjena') || ing.includes('palta') ||
        ing.includes('pepino') || ing.includes('kale') || ing.includes('rúcula') ||
        ing.includes('acelga') || ing.includes('banana') || ing.includes('batata') ||
        ing.includes('hongos') || ing.includes('calabaza') || ing.includes('repollo') ||
        ing.includes('choclo') || ing.includes('perejil') || ing.includes('cilantro')) return 'Verduras y Frutas';
    
    if (ing.includes('arroz') || ing.includes('quínoa') || ing.includes('quinoa') ||
        ing.includes('avena') || ing.includes('pan') || ing.includes('harina') ||
        ing.includes('papa') || ing.includes('mandioca')) return 'Carbohidratos';
    
    if (ing.includes('sal') || ing.includes('pimienta') || ing.includes('especias') ||
        ing.includes('aceite') || ing.includes('limón') || ing.includes('vinagre') ||
        ing.includes('mostaza') || ing.includes('comino') || ing.includes('orégano') ||
        ing.includes('paprika') || ing.includes('cúrcuma') || ing.includes('romero') ||
        ing.includes('soja') || ing.includes('curry') || ing.includes('ajo')) return 'Especias y Condimentos';
    
    return 'Otros';
}

// Guardar semana actual
function guardarSemanaActual() {
    if (Object.keys(app.planSemanal).length === 0) {
        mostrarNotificacion('No hay nada que guardar', 'error');
        return;
    }
    
    const nombreSemana = prompt('Nombre para esta semana (ej: "Semana del 1 al 7 de Diciembre"):');
    if (!nombreSemana) return;
    
    const semana = {
        id: Date.now(),
        nombre: nombreSemana,
        fecha: new Date().toLocaleDateString('es-ES'),
        plan: JSON.parse(JSON.stringify(app.planSemanal))
    };
    
    app.semanasGuardadas.push(semana);
    localStorage.setItem('semanasGuardadas', JSON.stringify(app.semanasGuardadas));
    
    mostrarNotificacion('Semana guardada exitosamente', 'success');
}

// Cargar semanas guardadas desde localStorage
function cargarSemanasGuardadas() {
    const guardadas = localStorage.getItem('semanasGuardadas');
    if (guardadas) {
        app.semanasGuardadas = JSON.parse(guardadas);
    }
}

// Renderizar semanas guardadas
function renderizarSemanasGuardadas() {
    const container = document.getElementById('semanasGuardadasList');
    
    if (app.semanasGuardadas.length === 0) {
        container.innerHTML = '<p class="empty-state">No hay semanas guardadas todavía</p>';
        return;
    }
    
    container.innerHTML = app.semanasGuardadas.map(semana => {
        const totalRecetas = Object.values(semana.plan).reduce((acc, dia) => acc + Object.keys(dia).length, 0);
        
        return `
            <div class="saved-week-card">
                <div class="saved-week-header">
                    <div>
                        <div class="saved-week-title">${semana.nombre}</div>
                        <div class="saved-week-date">Guardada el: ${semana.fecha}</div>
                    </div>
                    <div class="saved-week-actions">
                        <button class="btn btn-primary btn-small" onclick="cargarSemana(${semana.id})">📥 Cargar</button>
                        <button class="btn btn-danger btn-small" onclick="eliminarSemana(${semana.id})">🗑️</button>
                    </div>
                </div>
                <div class="saved-week-summary">
                    ${totalRecetas} recetas planificadas • ${Object.keys(semana.plan).length} días
                </div>
            </div>
        `;
    }).join('');
}

// Cargar semana guardada
function cargarSemana(id) {
    const semana = app.semanasGuardadas.find(s => s.id === id);
    if (!semana) return;
    
    app.planSemanal = JSON.parse(JSON.stringify(semana.plan));
    renderizarPlanificador();
    
    // Cambiar al tab del planificador
    document.querySelector('[data-tab="planificador"]').click();
    
    mostrarNotificacion('Semana cargada exitosamente', 'success');
}

// Eliminar semana guardada
function eliminarSemana(id) {
    if (!confirm('¿Estás segura de que quieres eliminar esta semana?')) return;
    
    app.semanasGuardadas = app.semanasGuardadas.filter(s => s.id !== id);
    localStorage.setItem('semanasGuardadas', JSON.stringify(app.semanasGuardadas));
    renderizarSemanasGuardadas();
    
    mostrarNotificacion('Semana eliminada', 'success');
}

// Limpiar plan semanal
function limpiarPlanSemanal() {
    if (!confirm('¿Estás segura de que quieres limpiar todo el planificador?')) return;
    
    app.planSemanal = {};
    renderizarPlanificador();
    mostrarNotificacion('Planificador limpiado', 'success');
}

// Setup event listeners
function setupEventListeners() {
    // Botón guardar semana
    document.getElementById('guardarSemana').addEventListener('click', guardarSemanaActual);
    
    // Botón limpiar semana
    document.getElementById('limpiarSemana').addEventListener('click', limpiarPlanSemanal);
    
    // Botón imprimir lista
    document.getElementById('imprimirLista').addEventListener('click', () => {
        window.print();
    });
    
    // Cerrar modales al hacer click en X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
    
    // Cerrar modales al hacer click fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Búsqueda de recetas
    document.getElementById('buscarReceta').addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        const todasRecetas = [...app.recetas.desayunos, ...app.recetas.almuerzos];
        const recetasFiltradas = todasRecetas.filter(r => 
            r.nombre.toLowerCase().includes(termino) || 
            r.base.toLowerCase().includes(termino) ||
            r.categorias.some(cat => cat.toLowerCase().includes(termino))
        );
        
        const grid = document.getElementById('recetasGrid');
        grid.innerHTML = recetasFiltradas.map(receta => `
            <div class="recipe-card" onclick="verDetalleReceta('${receta.id}')">
                <div class="recipe-header">
                    <div class="recipe-name">${receta.nombre}</div>
                </div>
                <div class="recipe-base">${receta.base}</div>
                <div class="recipe-info">👥 ${receta.porciones} porciones • ⏰ ${receta.conservacion}</div>
                <div class="recipe-categories">
                    ${receta.categorias.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
            </div>
        `).join('');
    });
    
    // Filtros de recetas
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const todasRecetas = [...app.recetas.desayunos, ...app.recetas.almuerzos];
            
            let recetasFiltradas = todasRecetas;
            if (filter !== 'all') {
                recetasFiltradas = todasRecetas.filter(r => r.categorias.includes(filter));
            }
            
            const grid = document.getElementById('recetasGrid');
            grid.innerHTML = recetasFiltradas.map(receta => `
                <div class="recipe-card" onclick="verDetalleReceta('${receta.id}')">
                    <div class="recipe-header">
                        <div class="recipe-name">${receta.nombre}</div>
                    </div>
                    <div class="recipe-base">${receta.base}</div>
                    <div class="recipe-info">👥 ${receta.porciones} porciones • ⏰ ${receta.conservacion}</div>
                    <div class="recipe-categories">
                        ${receta.categorias.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        });
    });
}

// Utilidades
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function cerrarModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
