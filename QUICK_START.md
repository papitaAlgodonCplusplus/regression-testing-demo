# Quick Start Guide - Regression Testing Demo

## 🚀 Para Empezar Rápido (5 minutos)

### Paso 1: Instalación
```bash
cd regression-testing-demo
npm install
```

### Paso 2: Verificar que Funciona
```bash
npm test
```
**Esperado:** Todos los tests pasan ✅

### Paso 3: Ver el Demo Completo
```bash
bash scripts/demo-scenario.sh
```

---

## 🎯 Para la Presentación (Opción Rápida)

### Demostrar el Concepto en 3 Pasos:

#### 1. Estado Inicial (30 segundos)
```bash
npm test
```
Mostrar: "✅ Todo funciona - 50 tests passing"

#### 2. Introducir Regresión (1 minuto)
```bash
# Reemplazar checkout.js con versión buggy
cp src/checkout-buggy.js src/checkout.js

# Ejecutar tests
npm test
```
Mostrar: "❌ Tests fallan - ¡Regresión detectada!"

#### 3. Comparar Estrategias (2 minutos)
```bash
# Re-test All
bash scripts/run-all-tests.sh

# Selective
bash scripts/run-selected-tests.sh
```
Mostrar: "Selective es 75% más rápido y detecta el mismo bug"

#### 4. Restaurar
```bash
git checkout src/checkout.js
# O copiar desde backup
```

---

## 📋 Checklist Pre-Presentación

- [ ] `npm install` completado
- [ ] `npm test` pasa correctamente
- [ ] Terminal con fuente grande (para que se vea en proyector)
- [ ] Scripts tienen permisos de ejecución (`chmod +x scripts/*.sh`)
- [ ] Editor de código abierto en `src/checkout.js`
- [ ] README.md abierto para referencia

---

## 🎬 Flujo Recomendado para Presentación (7 minutos)

### Minuto 1: Introducción
- Mostrar estructura del proyecto
- Explicar: "Sistema de e-commerce con pruebas automatizadas"

### Minutos 2-3: Baseline
```bash
node demo/scenario-1-baseline.js
npm test
```
- Explicar: "Todo funciona, 50 tests passing"

### Minuto 4: Nueva Funcionalidad
```bash
node demo/scenario-2-new-feature.js
```
- Explicar: "Agregamos cupones, tests siguen pasando"

### Minutos 5-6: Regresión
```bash
cp src/checkout-buggy.js src/checkout.js
npm test
```
- Explicar: "Bug introducido, tests detectan el problema"
- Mostrar el código del bug en editor

### Minuto 7: Estrategias
```bash
bash scripts/run-selected-tests.sh
```
- Explicar: "Selective testing: 75% más rápido, misma efectividad"

---

## 💡 Mensajes Clave para Transmitir

1. **¿Qué es Regression Testing?**
   - "Verificar que código que funcionaba sigue funcionando después de cambios"

2. **¿Por qué es importante?**
   - "Los cambios pueden romper funcionalidad existente sin que nos demos cuenta"

3. **Automatización**
   - "Sin automatización, esto sería imposible de hacer eficientemente"

4. **Estrategias**
   - "Re-test All: exhaustivo pero lento"
   - "Selective: inteligente y rápido"

5. **Beneficio Real**
   - "70% reducción en tiempo manteniendo 95% de efectividad"

---

## 🔧 Solución de Problemas Comunes

### Los tests no pasan inicialmente
```bash
# Asegurarse de estar en la versión correcta del código
git checkout src/checkout.js
npm test
```

### Los scripts no se ejecutan (Windows)
```bash
# Usar Git Bash o WSL
# O ejecutar comandos individuales:
npm test -- --testPathPattern="checkout|cart"
```

### No se ven bien los colores en terminal
```bash
# Forzar colores
npm test -- --colors
```

---

## 📞 Contacto de Emergencia Durante Presentación

Si algo falla durante la presentación:

1. **Plan B:** Mostrar el código y explicar conceptualmente
2. **Plan C:** Usar los archivos en `demo/` para explicar con ejemplos
3. **Plan D:** Mostrar el README.md que tiene todo documentado

---

## ✅ Validación Final

Antes de la presentación, ejecutar:
```bash
# Test 1: Baseline pasa
npm test
echo $?  # Debe ser 0

# Test 2: Con bug falla
cp src/checkout-buggy.js src/checkout.js
npm test
echo $?  # Debe ser diferente de 0

# Test 3: Restaurar
git checkout src/checkout.js
npm test
echo $?  # Debe ser 0 nuevamente
```

---

**¡Listo para presentar! 🎉**
