import PostComposer from "../components/PostComposer";
import Protected from "../components/Protected";

export default function ComposerPage() {
  return (
    <Protected>
    <main className="mx-auto max-w-xl p-4 sm:p-6 md:p-8">
      <h2 className="text-xl font-bold mb-2">Create Post</h2>
      <PostComposer />
    </main>

    </Protected>
  );
}
