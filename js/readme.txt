Proyecto Curriculum vitae para Argentina Programa 4.0 Etapa 1
Si bien el curso es en español he optado por hacerlo en su totalidad en inglés para hacerlo mas profesional y legible para un programador (para mi al menos es abrumador leer código que está basado en inglés y leer comentarios en otro idioma)
También se sugirió crear una hoja que "escriba toda la información que quiera incluir en el CV, para poder empezar a pensar en qué estructura se le dará al proyecto"
Debido a que no me siento cómodo con esa iniciativa he optado en hacerlo a la inversa, primero hacer el programa y darle forma para luego hacer dicha hoja
Muchos programadores caen en la trampa de ponerse a pensar como hacer "el dibujo" de su página web para luego empezar de cero una y otra vez
Por eso yo trabajo en el sentido contrario, primero creo funciones y/o clases que puedan ser adaptables a cualquier formato para al final dedicarle tiempo al formato definitivo que quiera yo o el cliente
Sería algo asi como crear un "Framework" (si esa es la palabra correcta) o un CMS (Content Management System) como blogger o un phpBB (Forum Software)
Es decir:
1.- Crear una función que obtenga los datos aleatorios de una página externa (nombre, dirección, email, etc)
2.- Almacenar esos datos en una base de datos (se creó un objeto y se lo guardó como Json en una sessión del navegador, localStorage)
3.- Segmentar esos datos para crear e-mail, y redes sociales ficticias
4.- Para demostrar esa "flexibilidad" se creó una función para refrescar esos datos y obtener nuevos datos aleatorios con el objetivo de que permita ver la cantidad de caracteres que puedan necesitar
5.- Ya teniendo los datos almacenados y viendo que datos son los mas comunes se dio paso al diseño
6.- Se buscó una plantilla acorde a lo solicitado, en este caso un Curriculum vitae
7.- Teniendo en cuenta que es un curso de programación y no de diseño gráfico se respetó el diseño de la plantilla pero teniendo en cuenta que se podrá modificar luego via backend (como se hace en la mayoría de los casos) por eso se mantuvo un diseño claro y consiso con mínimas agrupaciones como los tags div, ul
8.- Debido a la sugerencia del tutor se realizaron cambios perdiéndose en parte esa estructura y se agregaron los tags segment, aside, etc, sin embargo para evitar exposición de datos personales se obvió el "footer" con los datos del desarrollador que sería yo
9.- Luego se dio paso a la segmentación de dicho CV creando un menú que discrimine y ponga en "primer plano" los segmentos mas importantes, experiencia laboral, educación y una página con detalles extendidos menos importantes como el código postal etc.
10.- Para ello se creón un botón estilo hamburguesa que sea siempre visible y alterne con una X al activarse el menú y lo pueda volver a ocultar a dicho menú
11.- Se agregó al menu un link que abre un "pop up" que simula un "log in" que al logearse el usuario podría editar el texto de todo el documento pero para eso ya se necesita backend para "sanitizar" los formularios
12.- Si bien se podría haber creado una función (y estaba planeado hacerlo) que edite los campos anonimamente pareció innecesario hacer leer al tutor decenas de líneas de código ya que con el menú y la carga de datos se demostraron las habilidades de modificar los tags, su contenido y su formato
13.- Como ya fue mencionado, se agregó un botón al pop up de log in para obtener nuevos datos (solo por diversión para utilizar la función existente)
14.- También se pensó poner un "select" para alternar el idioma de los títulos del menú y los segmentos del documento pero se desechó la idea porque para eso sería ideal hacerlo en Backend con el soporte de plantillas ocultas y tal vez una base de datos
15.- Finalmente crear este archivo readme que detalle los pasos mas importantes en el desarrollo del proyecto al mejor estilo "copete" de una nota televisiva que describe la nota a continuación pero se graba al final de la nota






