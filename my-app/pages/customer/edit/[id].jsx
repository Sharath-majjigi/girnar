import AddEdit  from 'components/user/AddEdit';

import { userService } from 'services/user.service'


export async function getServerSideProps({ params }) {
    const user = await userService.getById(params.id);
    return {
        props:{user}
    }
}
export default AddEdit;