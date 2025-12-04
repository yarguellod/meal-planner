# 🍽️ Planificador de Comidas Semanal

Un planificador de comidas interactivo para preparar tu semana de Meal Prep. Diseñado para 2 personas con más de 60+ recetas saludables.

## ✨ Características

- 📅 **Planificador Semanal**: Organiza desayuno, almuerzo y cena para cada día de la semana
- 📖 **Biblioteca de Recetas**: 60+ recetas organizadas por categorías
- 🛒 **Lista de Compras Automática**: Genera automáticamente tu lista de compras basada en las recetas seleccionadas
- 💾 **Guardar Semanas**: Guarda tus planificaciones favoritas y reutilízalas
- 🔍 **Búsqueda y Filtros**: Encuentra recetas rápidamente por nombre, ingredientes o categoría
- 📱 **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- 🖨️ **Imprimible**: Imprime tu lista de compras fácilmente

## 🚀 Cómo Usar

### 1. Subir a GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos de este proyecto
3. Ve a Settings > Pages
4. En "Source", selecciona la rama `main` o `master`
5. Click en "Save"
6. Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repo/`

### 2. Usar Localmente

1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesita instalación

## 📂 Estructura del Proyecto

```
meal-planner/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos
├── js/
│   └── app.js              # Lógica de la aplicación
├── recipes/
│   ├── desayunos/
│   │   └── recetas-desayunos.json
│   └── almuerzos-cenas/
│       └── recetas-almuerzos-cenas.json
└── README.md
```

## 🍳 Bases de Recetas

### Desayunos
- **Base de Huevos**: Muffins, tortillas, magdalenas, croquetas, bandejas horneadas
- **Base de Pollo Desmechado**: Empanadas, burritos, muffins cremosos, tortitas de mandioca
- **Base de Atún**: Bolitas de banana, arepas, pastel, cupcakes, paté, tartaleta

### Almuerzos/Cenas
- **Base de Carne Molida**: Bowls, pasta zucchini, wraps, lasaña, canastitas, molde 3 capas
- **Base de Pollo Desmechado**: Túnel de banana, pastel, ensalada ranch, sándwiches, desgranado cremoso
- **Base de Salmón**: Croquetas, arroz de coliflor, wok, enrollados
- **Base de Pollo Molido**: Canelones, bandejón, bowls, lasaña, croquetas, canoas

## 💡 Tips de Uso

1. **Planifica tu semana los domingos** para tener todo organizado
2. **Guarda tus semanas favoritas** para repetirlas fácilmente
3. **Usa la lista de compras** para ir directamente al supermercado
4. **Filtra por categorías** para encontrar recetas vegetarianas o bajas en carbohidratos
5. **Imprime tu lista** antes de ir de compras

## 🔄 Actualizar Recetas

Para agregar o editar recetas, simplemente modifica los archivos JSON en la carpeta `recipes/`. Cada receta tiene esta estructura:

```json
{
  "id": "d1",
  "nombre": "Nombre de la Receta",
  "base": "Base proteica",
  "porciones": 2,
  "ingredientes": ["ingrediente 1", "ingrediente 2"],
  "preparacion": "Instrucciones paso a paso...",
  "conservacion": "2-3 días en heladera",
  "categorias": ["desayuno", "vegetariano"]
}
```

## 📱 Funcionalidades

### Planificador
- Arrastra o selecciona recetas para cada comida
- Visualiza tu semana completa de un vistazo
- Edita o elimina recetas fácilmente

### Lista de Compras
- Se genera automáticamente basada en tus selecciones
- Ingredientes agrupados por categoría
- Se eliminan duplicados automáticamente

### Semanas Guardadas
- Guarda planes semanales con nombre personalizado
- Carga planes anteriores en un click
- Elimina planes que ya no necesitas

## 🎨 Personalización

Puedes personalizar los colores editando las variables CSS en `styles.css`:
- Color principal: `#667eea`
- Color secundario: `#764ba2`

## 📄 Licencia

Este proyecto está diseñado para uso personal. Las recetas son propiedad de "Tus Guías Vitales".

## 🤝 Contribuir

Para agregar más recetas o mejorar la aplicación:
1. Edita los archivos correspondientes
2. Prueba localmente
3. Sube los cambios a tu repositorio

---

**¡Disfruta planificando tus comidas y ahorrando tiempo y dinero!** 🎉
