export default 
    [
      {
        title: 'Home',
        path: '/home_admin',
        exact: true,
        component: "HomeAdmin",
        rol:"admin",
        enable:true,
      },
      {
        title: 'Cursos',
        path: '/edit_exercise',
        exact: true,
        component:"EditExerciseForm",
        rol:"admin",
        enable:true,
      },
      {
        title: 'Carreras',
        path: '/edit_exercise',
        exact: true,
        component:"EditExerciseForm",
        rol:"admin",
        enable:true,
      },
      {
        title: 'Usuarios',
        path: '/edit_exercise',
        exact: true,
        component:"EditExerciseForm",
        rol:"admin",
        enable:true,
      },
      {
        title: 'Home',
        path: '/home_student',
        exact: true,
        component:"HomeStudent",
        rol:"student",
        enable:true,
      },
      {
        title: 'Enunciados',
        path: '/exercises_student',
        exact: true,
        component:"ExerciseListStudent",
        rol:"student",
        enable:true,
      },
      {
        title: 'Solucion',
        path: '/solution',
        exact: true,
        component:"Solution",
        rol:"student",
        enable:false,
      },
      {
        title: 'Home',
        path: '/home_teacher',
        exact: true,
        component:"HomeTeacher",
        rol:"teacher",
        enable:true,
      },
      {
        title: 'Enunciados',
        path: '/exercises_teacher',
        exact: true,
        component:"ExerciseListTeacher",
        rol:"teacher",
        enable:true,
      },
      {
        title: 'Crear Enunciado',
        path: '/create_exercise',
        exact: true,
        component:"CreateExerciseForm",
        rol:"teacher",
        enable:true,
      },
      {
        title: 'Mis Enunciados',
        path: '/published_exercises_teacher',
        exact: true,
        component:"ExerciseListTeacher",
        rol:"teacher",
        enable:true,
        routes:[
          {
            title: 'Publicados',
            path: '/published_exercises_teacher',
            exact: true,
            component:"ExerciseListTeacher",
            rol:"teacher",
            enable:true,
          },
          {
            title: 'No Publicados',
            path: '/published_exercises_teacher',
            exact: true,
            component:"ExerciseListTeacher",
            rol:"teacher",
            enable:true,
          },
        ]
      },
      

      {
        title: 'Editar Enunciado',
        path: '/edit_exercise',
        exact: true,
        component:"EditExerciseForm",
        rol:"teacher",
        enable:false,
      },
      
    ]
  ;
  