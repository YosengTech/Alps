${
  string constr(Property property)
  {
  return property.Type.IsEnumerable?$"this.{property.name}=[]":$"";
  }

}
$Classes(Alps.Web.Admin.Model.*Model)[
   export class $Name$TypeParameters { $Properties[
        $name: $Type;]
        constructor(){
          $Properties[$constr]
        }
    }]
