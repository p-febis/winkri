import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const HeaderLinks = () => {
    return (
        <Button variant="link" className="p-5" asChild>
            <Link to="/products">Products</Link>
        </Button>
    );
};
