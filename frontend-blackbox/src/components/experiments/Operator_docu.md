## Operadores de Comparación
Operador	Explicación
$eq	        Igual a
$ne	        Distinto de
$gt	        Mayor que
$gte	    Mayor o igual que
$lt	        Menor que
$lte	    Menor o igual que
$in	        Coincide con alguno de los valores en un array
$nin	    No coincide con ninguno del array

## Operadores lógicos
Operador	Explicación
$and	    Todas las condiciones deben cumplirse
$or	        Al menos una condición debe cumplirse
$nor	    Ninguna condición debe cumplirse
$not	    Niega una condición

## Operadores de Evaluación
Operador	Explicación
$regex	    Búsqueda con expresión regular
$options	Opciones para $regex (ej: "i" = case insensitive)
$expr	    Permite usar expresiones dentro del query
$jsonSchema	Valida contra un esquema JSON
$mod	    Módulo (división con resto)
$text	    Búsqueda de texto con índice text
$where	    Ejecuta función JS (⚠️ evitar en producción)
