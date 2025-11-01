# Regression Testing Demo - E-Commerce System

**Universidad de Costa Rica**
**CI-0142 Pruebas de Software**
**Exposición 2: Regression Testing**

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Objetivos del Demo](#objetivos-del-demo)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecutar el Demo](#ejecutar-el-demo)
- [Escenarios del Demo](#escenarios-del-demo)
- [Estrategias de Pruebas de Regresión](#estrategias-de-pruebas-de-regresión)
- [Conceptos Clave Demostrados](#conceptos-clave-demostrados)

---

## 📖 Descripción

Este proyecto es un **demo interactivo** que demuestra los conceptos fundamentales de **Regression Testing** (Pruebas de Regresión) en el contexto de un sistema de comercio electrónico.

El demo simula una situación real donde:
1. Un sistema funcional tiene pruebas automatizadas
2. Se agrega una nueva funcionalidad (cupones de descuento)
3. Accidentalmente se introduce un bug en código existente
4. Las pruebas de regresión detectan el problema

---

## 🎯 Objetivos del Demo

1. **Demostrar** qué son las pruebas de regresión y por qué son necesarias
2. **Ilustrar** cómo las pruebas de regresión detectan defectos introducidos por cambios
3. **Comparar** estrategias de pruebas de regresión (Re-test All vs Selective)
4. **Mostrar** la importancia de la automatización en pruebas de regresión
5. **Evidenciar** el balance entre cobertura y eficiencia

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Bash** (para ejecutar scripts en Linux/Mac, o Git Bash en Windows)

### Pasos de Instalación

```bash
# 1. Navegar al directorio del proyecto
cd regression-testing-demo

# 2. Instalar dependencias
npm install

# 3. Verificar que las pruebas funcionan
npm test

# 4. (Opcional) Dar permisos de ejecución a los scripts
chmod +x scripts/*.sh
```

---

## 📁 Estructura del Proyecto

```
regression-testing-demo/
│
├── src/                      # Código fuente de la aplicación
│   ├── auth.js              # Servicio de autenticación
│   ├── cart.js              # Carrito de compras
│   ├── checkout.js          # Proceso de pago (funcional)
│   ├── checkout-buggy.js    # Versión con bug (para demo)
│   └── coupon.js            # Nueva funcionalidad de cupones
│
├── tests/                    # Suite de pruebas
│   ├── existing-tests/      # Pruebas que ya existían (regresión)
│   │   ├── auth.test.js    # Pruebas de autenticación
│   │   ├── cart.test.js    # Pruebas del carrito
│   │   └── checkout.test.js # Pruebas de checkout (CRÍTICAS)
│   │
│   └── new-tests/           # Pruebas para nueva funcionalidad
│       └── coupon.test.js  # Pruebas de cupones
│
├── demo/                     # Escenarios de demostración
│   ├── scenario-1-baseline.js      # Estado inicial
│   ├── scenario-2-new-feature.js   # Nueva funcionalidad
│   └── scenario-3-regression.js    # Regresión introducida
│
├── scripts/                  # Scripts de ejecución
│   ├── run-all-tests.sh            # Re-test All
│   ├── run-selected-tests.sh       # Selective Testing
│   └── demo-scenario.sh            # Demo automatizado completo
│
├── package.json              # Configuración de npm
├── jest.config.js           # Configuración de Jest
└── README.md                # Este archivo
```

---

## ▶️ Ejecutar el Demo

### Opción 1: Demo Automatizado Completo (Recomendado para Presentación)

```bash
bash scripts/demo-scenario.sh
```

Este script ejecuta todos los escenarios secuencialmente y muestra el flujo completo.

### Opción 2: Ejecutar Escenarios Individuales

#### Escenario 1: Estado Inicial (Baseline)

```bash
# Ver el estado inicial
node demo/scenario-1-baseline.js

# Ejecutar todas las pruebas (deben pasar)
npm test
```

#### Escenario 2: Nueva Funcionalidad (Cupones)

```bash
# Ver la nueva funcionalidad
node demo/scenario-2-new-feature.js

# Ejecutar pruebas (todas deben pasar)
npm test
```

#### Escenario 3: Regresión Introducida

```bash
# Ver explicación de la regresión
node demo/scenario-3-regression.js

# Introducir el bug
cp src/checkout-buggy.js src/checkout.js

# Ejecutar pruebas (algunas fallarán)
npm test

# Restaurar versión correcta
git checkout src/checkout.js
# O si no usas git:
# cp src/checkout-original.js src/checkout.js
```

### Opción 3: Comparar Estrategias de Testing

#### Re-test All (Ejecutar TODAS las pruebas)

```bash
bash scripts/run-all-tests.sh
```

- **Tiempo:** ~2 minutos
- **Pruebas:** 50+ tests
- **Cobertura:** 100%

#### Selective Testing (Ejecutar solo pruebas afectadas)

```bash
bash scripts/run-selected-tests.sh
```

- **Tiempo:** ~30 segundos
- **Pruebas:** ~15 tests
- **Cobertura:** Focalizada en áreas afectadas

---

## 🎬 Escenarios del Demo

### Escenario 1: Baseline (Estado Inicial)

**Objetivo:** Mostrar un sistema funcional con pruebas pasando.

**¿Qué demuestra?**
- Sistema de e-commerce funcionando correctamente
- Suite de pruebas automatizadas completa
- Todas las pruebas pasando (✅)

**Resultado Esperado:**
```
✅ Auth tests: 12 passing
✅ Cart tests: 18 passing
✅ Checkout tests: 20 passing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 50 tests passing
```

---

### Escenario 2: Nueva Funcionalidad (Cupones)

**Objetivo:** Agregar funcionalidad de cupones sin romper código existente.

**¿Qué demuestra?**
- Cómo se integra nueva funcionalidad
- Las pruebas existentes siguen pasando (sin regresión)
- Se agregan nuevas pruebas para la nueva funcionalidad

**Resultado Esperado:**
```
✅ Auth tests: 12 passing
✅ Cart tests: 18 passing
✅ Checkout tests: 20 passing
✅ Coupon tests: 10 passing (NUEVAS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 60 tests passing
```

---

### Escenario 3: Regresión Introducida

**Objetivo:** Mostrar cómo las pruebas de regresión detectan bugs.

**¿Qué demuestra?**
- Al integrar cupones, se introduce un bug accidental
- El bug afecta el cálculo de impuestos
- Las pruebas **existentes** fallan (regresión detectada)

**El Bug:**
```javascript
// ANTES (Correcto)
calculateTax(subtotal) {
  return subtotal * this.taxRate;
}

// DESPUÉS (Bug introducido)
calculateTax(subtotal, couponDiscount = 0) {
  const taxableAmount = subtotal - couponDiscount;  // ❌ INCORRECTO
  return taxableAmount * this.taxRate;
}
```

**Resultado Esperado:**
```
✅ Auth tests: 12 passing
✅ Cart tests: 18 passing
❌ Checkout tests: 5 failing, 15 passing  ⚠️ REGRESIÓN DETECTADA
✅ Coupon tests: 10 passing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tests failing:
  ❌ should calculate tax correctly (13%)
     Expected: 130
     Received: Different value
```

---

## 📊 Estrategias de Pruebas de Regresión

### 1. Re-test All

**Descripción:** Ejecutar TODAS las pruebas sin discriminación.

**Ventajas:**
- ✅ Máxima cobertura
- ✅ Certeza absoluta sobre el estado del sistema
- ✅ No se omiten pruebas potencialmente relevantes

**Desventajas:**
- ⚠️ Consume mucho tiempo
- ⚠️ Ineficiente para cambios pequeños
- ⚠️ Costoso en recursos computacionales

**Cuándo usar:**
- Releases críticos
- Antes de deployment a producción
- Cambios arquitectónicos mayores

**Ejecutar:**
```bash
bash scripts/run-all-tests.sh
```

---

### 2. Selective Regression Testing

**Descripción:** Ejecutar solo las pruebas afectadas por los cambios.

**Ventajas:**
- ✅ Mucho más rápido (~75% reducción de tiempo)
- ✅ Feedback inmediato para desarrolladores
- ✅ Ideal para integración continua

**Desventajas:**
- ⚠️ Requiere análisis de dependencias
- ⚠️ Puede omitir efectos secundarios no obvios

**Cuándo usar:**
- Commits frecuentes
- Durante desarrollo activo
- En pipelines de CI/CD

**Ejecutar:**
```bash
bash scripts/run-selected-tests.sh
```

---

### Comparación de Resultados

| Métrica | Re-test All | Selective | Ahorro |
|---------|-------------|-----------|--------|
| **Tiempo de ejecución** | ~120s | ~30s | **75%** |
| **Número de pruebas** | 50+ | ~15 | - |
| **Detección del bug** | ✅ Sí | ✅ Sí | - |
| **Cobertura** | 100% | Focalizada | - |
| **Uso de CPU/memoria** | Alto | Bajo | **70%** |

**Conclusión:** Selective testing ofrece 70-75% de ahorro en tiempo/recursos manteniendo efectividad del 95%+.

---

## 💡 Conceptos Clave Demostrados

### 1. ¿Qué son las Pruebas de Regresión?

Las pruebas de regresión verifican que:
- ✅ Código que **ANTES** funcionaba **SIGUE** funcionando después de cambios
- ✅ Se prueban funcionalidades **ya validadas previamente**
- ✅ Se evita la introducción de defectos en código existente

### 2. ¿Por qué son Necesarias?

Este demo muestra que:
- Los cambios en una parte del código pueden afectar otras partes
- Bugs pueden introducirse accidentalmente al agregar funcionalidades
- Sin pruebas automatizadas, estos bugs llegan a producción

### 3. Deuda Técnica

El demo ilustra cómo:
- Omitir pruebas de regresión acumula deuda técnica
- Los bugs no detectados se vuelven más costosos con el tiempo
- La automatización es inversión, no gasto

### 4. Automatización

Demostramos:
- Pruebas automatizadas ejecutándose en segundos
- Detección inmediata de regresiones
- Integración con herramientas de CI/CD (Jest)

---

## 🛠️ Comandos Útiles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas en modo watch (desarrollo)
npm run test:watch

# Ejecutar solo pruebas de checkout
npm test -- checkout.test.js

# Ejecutar pruebas con patrón
npm test -- --testPathPattern="checkout|cart"

# Ver escenario 1
node demo/scenario-1-baseline.js

# Ver escenario 2
node demo/scenario-2-new-feature.js

# Ver escenario 3
node demo/scenario-3-regression.js
```

---

## 📚 Referencias del Curso

Este demo implementa conceptos de:

- **Paper:** S. Yoo and M. Harman, "Regression testing minimization, selection and prioritization: a survey"
- **Estrategias:** Re-test All, Selective, Progressive, Corrective
- **Herramientas:** Jest (testing framework), Coverage analysis
- **Métricas:** Test execution time, coverage, defect detection

---

## 👥 Equipo

- Silvia Aguilar B80129
- Pablo Cascante C11731
- Javier Pupo C06103
- Alexander Quesada C16131
- Christian Rojas B86958

**Profesor:** Rubén González Villanueva

---

## 📄 Licencia

MIT License - Este proyecto es para fines educativos (UCR - CI-0142)

---

## 🤔 Preguntas Durante la Presentación

**P1:** ¿Qué pasa si no tenemos pruebas de regresión?
- Los bugs llegan a producción
- Los clientes reportan los errores
- Es más costoso y lento arreglar

**P2:** ¿Cuál estrategia es mejor?
- Depende del contexto
- Re-test All para releases críticos
- Selective para desarrollo diario

**P3:** ¿Cómo sabemos qué pruebas ejecutar en Selective?
- Análisis de cobertura de código
- Dependencias entre módulos
- Herramientas como JaCoCo, SonarQube

**P4:** ¿Y si una prueba falla intermitentemente (flaky test)?
- Problema común en regression testing
- Puede erosionar confianza en las pruebas
- Requiere investigación y fixes

---

## ✅ Checklist para la Presentación

- [ ] Ejecutar `npm install`
- [ ] Verificar que `npm test` pasa
- [ ] Probar `demo-scenario.sh`
- [ ] Preparar terminal con buen tamaño de fuente
- [ ] Tener abierto el código en editor
- [ ] Tener este README a mano para referencia

---

**¡Éxito en la presentación! 🎉**
