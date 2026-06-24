export interface GuideCategory {
  id: string;
  name: string;
  guides: Guide[];
}

export interface Guide {
  id: string;
  name: string;
  title: string;
  text: Text[];
  footer: string;
}

export interface Text {
  title: string;
  description: string[];
}
