# 🎉 ¡Tu Planificador de Comidas está Listo!

Hola Yani! He creado tu planificador de comidas completo con todas las recetas de tus documentos.

## 📊 Resumen del Proyecto

✅ **40 Recetas totales extraídas**
- 17 Recetas de Desayunos
- 23 Recetas de Almuerzos/Cenas

✅ **Funcionalidades Principales**
1. Planificador semanal (Desayuno, Almuerzo, Cena para cada día)
2. Lista de compras automática agrupada por categorías
3. Guardar semanas favoritas (se guardan en tu navegador)
4. Búsqueda y filtros de recetas
5. Vista detallada de cada receta con ingredientes y preparación
6. Responsive (funciona en móvil, tablet y desktop)
7. Impresión de lista de compras

## 🚀 Cómo Subir a GitHub (Paso a Paso)

### Opción 1: Desde GitHub.com (Más Fácil)

1. **Crear Repositorio**
   - Ir a https://github.com/new
   - Nombre: `meal-planner` (o el que quieras)
   - Público o Privado (tu elección)
   - NO marcar "Add a README file"
   - Click en "Create repository"

2. **Subir Archivos**
   - En la página del nuevo repositorio, click en "uploading an existing file"
   - Arrastra TODA la carpeta `meal-planner` (o selecciona todos los archivos dentro)
   - Espera a que suban todos los archivos
   - Click en "Commit changes"

3. **Activar GitHub Pages**
   - Ve a Settings (en tu repositorio)
   - En el menú izquierdo, click en "Pages"
   - En "Source", selecciona la rama `main`
   - Click en "Save"
   - ¡Listo! En unos minutos estará disponible en: `https://tu-usuario.github.io/meal-planner/`

### Opción 2: Usando Git (Terminal)

```bash
cd meal-planner
git init
git add .
git commit -m "Initial commit - Meal Planner"
git branch -M main
git remote add origin https://github.com/tu-usuario/meal-planner.git
git push -u origin main
```

Luego activa GitHub Pages como en la Opción 1, paso 3.

## 📱 Cómo Usar la Aplicación

### 1. Planificar tu Semana
- Ve al tab "📅 Planificar Semana"
- Click en "+" en cualquier comida de cualquier día
- Selecciona una receta del modal que se abre
- La receta se agrega automáticamente
- Para ver detalles: click en el ojo 👁️
- Para eliminar: click en la X

### 2. Ver Todas las Recetas
- Ve al tab "📖 Ver Recetas"
- Navega por todas las 40 recetas
- Usa los filtros: Todas, Desayunos, Almuerzos, Cenas, Vegetarianas, Bajo en Carbos
- Usa la búsqueda para encontrar recetas específicas
- Click en cualquier receta para ver ingredientes y preparación completa

### 3. Generar Lista de Compras
- Primero agrega recetas a tu planificador
- Ve al tab "🛒 Lista de Compras"
- La lista se genera automáticamente
- Ingredientes agrupados por categoría (Proteínas, Verduras, Lácteos, etc.)
- Los duplicados se eliminan automáticamente
- Click en "🖨️ Imprimir" para imprimir la lista

### 4. Guardar Semanas
- Una vez que tengas tu semana planificada
- Click en "💾 Guardar Semana"
- Dale un nombre (ej: "Semana del 1-7 de Diciembre")
- Ve al tab "💾 Semanas Guardadas" para ver todas tus semanas
- Click en "📥 Cargar" para usar una semana guardada
- Las semanas se guardan en tu navegador (localStorage)

## 💡 Tips para Aprovechar al Máximo

1. **Planifica los Domingos**: Dedica 15 minutos cada domingo para planificar tu semana
2. **Reutiliza Semanas**: Guarda tus semanas favoritas y rótalas
3. **Mezcla y Combina**: No tenés que llenar todos los días - agrega solo lo que necesites
4. **Meal Prep Bases**: Muchas recetas comparten la misma base (pollo desmechado, carne molida, etc.) - preparalas el domingo y usá durante la semana
5. **Lista de Compras**: Imprimila o tomale captura para llevar al súper

## 🔧 Personalización Futura

### Para Agregar Más Recetas
1. Abre `recipes/desayunos/recetas-desayunos.json` o `recipes/almuerzos-cenas/recetas-almuerzos-cenas.json`
2. Agrega una nueva receta siguiendo el mismo formato
3. Guarda el archivo
4. Sube los cambios a GitHub

### Para Cambiar Colores
1. Abre `css/styles.css`
2. Busca las líneas con los colores `#667eea` y `#764ba2`
3. Cámbialos por tus colores favoritos
4. Guarda y sube los cambios

## 📋 Estructura de Archivos

```
meal-planner/
├── index.html                          # Página principal
├── README.md                           # Documentación
├── GUIA_RAPIDA.md                     # Esta guía
├── css/
│   └── styles.css                      # Todos los estilos
├── js/
│   └── app.js                          # Toda la lógica
└── recipes/
    ├── desayunos/
    │   └── recetas-desayunos.json     # 17 recetas de desayuno
    └── almuerzos-cenas/
        └── recetas-almuerzos-cenas.json # 23 recetas de almuerzo/cena
```

## 🎯 Recetas Incluidas

### Desayunos (17 recetas)
**Base Huevos (6)**: Muffins de champiñones, Tortilla mixta, Tostada con crema de huevo, Magdalenas de zanahoria, Croquetas campesinas, Bandeja horneada

**Base Pollo Desmechado (5)**: Empanadas de batata, Burritos, Muffins cremosos, Tortitas de mandioca, Omelette relleno

**Base Atún (6)**: Bolitas de banana, Arepa de avena, Pastel de batata, Cupcakes, Paté, Tartaleta

### Almuerzos/Cenas (23 recetas)
**Base Carne Molida (6)**: Bowl mexicano, Pasta zucchini, Wraps, Lasaña, Canastitas, Molde 3 capas

**Base Pollo Desmechado (6)**: Túnel de banana, Pastel a la sartén, Ensalada ranch, Sándwich de berenjena, Desgranado cremoso, Milanesa sobre banana frita

**Base Salmón (5)**: Croquetas de quínoa, Arroz de coliflor, Wok especial, Croquetas dulces, Enrollado

**Base Pollo Molido (6)**: Canelones de berenjena, Bandejón de arroz, Bowl de batata, Lasaña, Croquetas de banana, Canoas de zucchini

## 🚀 ¡A Cocinar!

Todo está listo para que empieces a usar tu planificador. Cualquier duda o si querés agregar más funcionalidades, avisame!

---

**Nota**: El planificador funciona 100% en el navegador - no necesita base de datos ni backend. Todo se guarda localmente en tu navegador usando localStorage.
