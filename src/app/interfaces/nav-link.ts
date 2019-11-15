import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface NavLink {
    text?: string;
    url?: string;
    icon?: IconDefinition;
    action?(): void;
}
