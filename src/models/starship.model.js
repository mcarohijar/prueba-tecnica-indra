class NaveEspacial {
  // constructor to initiaze according to api respoonse
  constructor(starship) {
    this.id = starship.id;
    this.nombre = starship.name;
    this.modelo = starship.model;
    this.tipoNave = starship.starship_class;
    this.fabricante = starship.manufacturer;
    this.costo = starship.cost_in_credits;
    this.tamano = starship.length;
    this.tripulacionRequerida = starship.crew;
    this.aforoPasajeros = starship.passengers;
    this.velocidadMaxima = starship.max_atmosphering_speed;
    this.tipoMotor = starship.hyperdrive_rating;
    this.megalucesPorHora = starship.MGLT;
    this.pesoMaximo = starship.cargo_capacity;
    this.consumibles = starship.consumables;
    this.peliculas = starship.films;
    this.pilotos = starship.pilots;
    this.url = starship.url;
    this.fechaCreacion = starship.created;
    this.fechaModificacion = starship.edited;
  }
}

module.exports = NaveEspacial;