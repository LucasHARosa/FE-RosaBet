export interface RulesI {
  _id: string;
  title: string;
  title_language: {
    _id: string;
    english: string;
    portuguese: string;
    spanish: string;
  };
}

export interface RulesDetailI {
  _id: string;
  title: string;
  items: ItemsProps[];
  subrules_language: {
    _id: string;
    english: ItemsProps[];
    portuguese: ItemsProps[];
    spanish: ItemsProps[];
  };
  title_language: {
    _id: string;
    portuguese: string;
    english: string;
    spanish: string;
  };
}

export interface ItemsProps {
  _id: string;
  title: string;
  description: string;
  url_image: string;
}
