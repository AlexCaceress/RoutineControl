import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {

  ejercicios_hombros = [
    "Press de hombros con barra",
    "Press de hombros con mancuernas",
    "Elevaciones laterales con mancuernas",
    "Elevaciones frontales con mancuernas",
    "Pájaros con mancuernas",
    "Encogimientos de hombros con barra o mancuernas",
    "Press militar",
    "Press Arnold",
    "Elevaciones frontales con polea alta",
    "Press de hombros con máquina Smith"
  ]

  ejercicios_pecho = [
    "Press de banca",
    "Press de banca inclinado",
    "Press de banca declinado",
    "Aperturas con mancuernas",
    "Fondos en máquina",
    "Pullover con mancuerna",
    "Push-ups (flexiones)",
    "Press de pecho con polea alta",
    "Press de pecho declinado con mancuernas",
    "Cruce en poleas en bance inclinado",
  ]

  ejercicios_piernas = [
    "Sentadillas (squats)",
    "Prensa de piernas",
    "Hack Squat",
    "Extensiones de cuádriceps",
    "Curl de piernas acostado (isquiotibiales)",
    "Zancadas con mancuernas o barra",
    "Peso muerto (deadlift)",
    "Hip Thrusts",
    "Elevaciones de pantorrillas de pie",
    "Step-ups",
    "Búlgaras en Multipower",
  ]

  ejercicios_brazos = [
    "Curl de bíceps con barra",
    "Curl de bíceps con mancuernas",
    "Curl martillo",
    "Curl concentrado",
    "Curl de 21",
    "Extensiones de tríceps en polea alta",
    "Fondos en paralelas (tríceps)",
    "Press de tríceps con barra",
    "Fondos en máquina (tríceps)",
    "Extensiones de tríceps con mancuerna"
  ]

  ejercicios_espalda = [
    "Dominadas (pull-ups)",
    "Pull-downs al pecho",
    "Pull-over con barra o mancuerna",
    "Remo con barra T",
    "Remo con mancuerna",
    "Pull-downs en polea alta",
    "Hiperextensiones lumbares",
    "Encogimientos de hombros con barra o mancuernas",
    "Pull-ups con agarre cerrado",
    "Pull-ups con agarre ancho"
]

  constructor() { }

  getChestExercices() {
    return this.ejercicios_pecho;
  }
  getBackExercices() {
    return this.ejercicios_espalda;
  }
  getShouldersExercices() {
    return this.ejercicios_hombros;
  }
  getArmExercices() {
    return this.ejercicios_brazos;
  }
  getLegExercices() {
    return this.ejercicios_piernas;
  }


}
