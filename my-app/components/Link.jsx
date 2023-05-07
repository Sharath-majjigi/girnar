import NextLink from "next/link";

const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <li {...props}>{children}</li>
    </NextLink>
  );
};

export { Link };
