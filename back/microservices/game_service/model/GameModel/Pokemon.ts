export class Pokemon {
    private id:number;
    private name:string;
    private description:string;
    private family:string;
    private affinity:string;
    private imgUrl:string;
    private smallImgUrl:string;
    private energy:number;
    private hp:number;
    private defense:number;
    private attack:number;
    private price:number;
    private userId:number;
  
    constructor(id, name, description, family, affinity, imgUrl, smallImgUrl, energy, hp, defense, attack, price, userId) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.family = family;
      this.affinity = affinity;
      this.imgUrl = imgUrl;
      this.smallImgUrl = smallImgUrl;
      this.energy = energy;
      this.hp = hp;
      this.defense = defense;
      this.attack = attack;
      this.price = price;
      this.userId=userId;
    }

    public getName():string{
      return this.name;
    }

    public getDescription():string{
      return this.description;
    }

    public getFamily():string{
      return this.family;
    }

    public getAffinity():string{
      return this.affinity;
    }

    public getImgUrl():string{
      return this.imgUrl;
    }

    public getSmallImgUrl():string{
      return this.smallImgUrl;
    }

    public getHp():number{
      return this.hp;
    }

    public setHp(newHp:number){
      this.hp=newHp;
    }

    public getId():number{
      return this.id;
    }

    public getEnergy():number{
      return this.energy;
    }

    public getDefense():number{
      return this.defense;
    }

    public getAttack():number{
      return this.attack;
    }

    public getPrice():number{
      return this.price;
    }

    public getUserId():number{
      return this.userId;
    }
}